param(
  [Parameter(Mandatory = $true)]
  [string]$Source,

  [Parameter(Mandatory = $true)]
  [string]$Output
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Get-Slug([string]$Value) {
  $normalized = $Value.Normalize([Text.NormalizationForm]::FormD)
  $builder = [Text.StringBuilder]::new()
  foreach ($character in $normalized.ToCharArray()) {
    if ([Globalization.CharUnicodeInfo]::GetUnicodeCategory($character) -ne [Globalization.UnicodeCategory]::NonSpacingMark) {
      [void]$builder.Append($character)
    }
  }
  return (($builder.ToString().ToLowerInvariant() -replace '[^a-z0-9]+', '-').Trim('-'))
}

Add-Type -AssemblyName System.IO.Compression.FileSystem
$archive = [IO.Compression.ZipFile]::OpenRead((Resolve-Path -LiteralPath $Source))
try {
  $entry = $archive.GetEntry('word/document.xml')
  if (-not $entry) { throw 'O arquivo DOCX não contém word/document.xml.' }

  $reader = [IO.StreamReader]::new($entry.Open())
  try { [xml]$document = $reader.ReadToEnd() } finally { $reader.Dispose() }

  $namespace = [Xml.XmlNamespaceManager]::new($document.NameTable)
  $namespace.AddNamespace('w', 'http://schemas.openxmlformats.org/wordprocessingml/2006/main')

  $rows = @()
  foreach ($paragraph in $document.SelectNodes('//w:body/w:p', $namespace)) {
    $styleNode = $paragraph.SelectSingleNode('./w:pPr/w:pStyle', $namespace)
    $style = if ($styleNode) {
      $styleNode.GetAttribute('val', 'http://schemas.openxmlformats.org/wordprocessingml/2006/main')
    } else {
      'Normal'
    }
    $text = (($paragraph.SelectNodes('.//w:t', $namespace) | ForEach-Object { $_.'#text' }) -join '').Trim()
    if ($text) { $rows += [pscustomobject]@{ Style = $style; Text = $text } }
  }

  $articles = @()
  for ($index = 0; $index -lt $rows.Count; $index++) {
    if ($rows[$index].Style -ne 'Heading1') { continue }
    if ($index -eq 0) { throw "Categoria ausente antes do título '$($rows[$index].Text)'." }

    $categorySource = $rows[$index - 1].Text
    $culture = [Globalization.CultureInfo]::GetCultureInfo('pt-BR')
    $category = $culture.TextInfo.ToTitleCase($categorySource.ToLower($culture))
    $category = $category -replace '\bAbr\b', 'ABR' -replace '\bDo\b', 'do' -replace '\bDa\b', 'da' -replace '\bDe\b', 'de' -replace '\bE\b', 'e' -replace '\bO\b', 'o' -replace '\bSeu\b', 'seu'

    $title = $rows[$index].Text
    $summary = $rows[$index + 1].Text
    $byline = $rows[$index + 2].Text
    if ($byline -notmatch 'Publicado em (\d{2})/(\d{2})/(\d{4})$') { throw "Data inválida em '$title': $byline" }
    $dateDisplay = "$($Matches[1])/$($Matches[2])/$($Matches[3])"
    $date = "$($Matches[3])-$($Matches[2])-$($Matches[1])"
    $intro = $rows[$index + 3].Text
    $cursor = $index + 4
    $sections = @()

    for ($sectionIndex = 0; $sectionIndex -lt 3; $sectionIndex++) {
      if ($rows[$cursor].Style -ne 'Heading2') { throw "Seção esperada em '$title'." }
      $heading = $rows[$cursor].Text
      $cursor++
      if ($rows[$cursor].Style -ne 'Normal') { throw "Parágrafo esperado após '$heading'." }
      $sections += [ordered]@{ heading = $heading; body = $rows[$cursor].Text }
      $cursor++
    }

    if ($rows[$cursor].Style -ne 'Heading2') { throw "Checklist esperado em '$title'." }
    $checklistTitle = $rows[$cursor].Text
    $cursor++
    $items = @()
    while ($cursor -lt $rows.Count -and $rows[$cursor].Style -eq 'ListBullet') {
      $items += $rows[$cursor].Text
      $cursor++
    }
    if ($items.Count -ne 5) { throw "O checklist de '$title' possui $($items.Count) itens; eram esperados 5." }
    if ($cursor -ge $rows.Count -or $rows[$cursor].Style -ne 'Normal') { throw "Nota final esperada em '$title'." }

    $articles += [pscustomobject][ordered]@{
      slug = Get-Slug $title
      title = $title
      category = $category
      summary = $summary
      date = $date
      dateDisplay = $dateDisplay
      intro = $intro
      sections = $sections
      checklist = [ordered]@{ title = $checklistTitle; items = $items }
      note = $rows[$cursor].Text
    }
  }

  if ($articles.Count -ne 100) { throw "Foram encontrados $($articles.Count) artigos; eram esperados 100." }
  $duplicateSlugs = $articles | Group-Object slug | Where-Object Count -gt 1
  if ($duplicateSlugs) { throw "Slugs duplicados: $(($duplicateSlugs.Name) -join ', ')" }

  $json = $articles | ConvertTo-Json -Depth 8
  $outputPath = [IO.Path]::GetFullPath((Join-Path (Get-Location) $Output))
  $outputDirectory = [IO.Path]::GetDirectoryName($outputPath)
  [IO.Directory]::CreateDirectory($outputDirectory) | Out-Null
  [IO.File]::WriteAllText($outputPath, $json + [Environment]::NewLine, [Text.UTF8Encoding]::new($false))
  Write-Output "Importados $($articles.Count) artigos para $outputPath"
} finally {
  $archive.Dispose()
}
