export const kmlGenerator = (
  fileName,
  placeName,
  placeDescription,
  lat,
  lng
) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://earth.google.com/kml/2.2">
  <Document>
    <name>${fileName}</name>
    <description><![CDATA[Example KML file]]></description>
    <Style id="style1">
      <IconStyle>
        <Icon>
          <href>//maps.google.com/mapfiles/ms/icons/blue-dot.png</href>
        </Icon>
      </IconStyle>
    </Style>
    <Style id="style2">
      <LineStyle>
        <color>40000000</color>
        <width>3</width>
      </LineStyle>
      <PolyStyle>
        <color>A600CC33</color>
        <fill>1</fill>
        <outline>1</outline>
      </PolyStyle>
    </Style>
    <Style id="style3">
      <LineStyle>
        <color>E60000FF</color>
        <width>15</width>
      </LineStyle>
    </Style>
    <Placemark>
      <name>${placeName}</name>
      <description><![CDATA[${placeDescription}]]></description>
      <styleUrl>#style1</styleUrl>
      <Point>
        <coordinates>${lat},${lng},0.000000</coordinates>
      </Point>
    </Placemark>
  </Document>
</kml>`;
};
