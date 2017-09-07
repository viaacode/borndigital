<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    
  <xsl:template match="/">
        <MediaHAVEN_external_metadata>
            <xsl:for-each select="VIAA">
                <xsl:for-each select="*">
                  <xsl:element name="<xsl:value-of select='local-name()'/>"> : <xsl:value-of select="."/>
                </xsl:for-each>  
              </xsl:for-each>
         </MediaHAVEN_external_metadata>      
  </xsl:template>
</xsl:stylesheet>