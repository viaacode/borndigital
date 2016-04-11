<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="xml" indent="yes" omit-xml-declaration="yes"/>
  <xsl:param name="fragments"/>
  <!-- 
  <xsl:variable name="newfragments" select="$fragments" disable-output-escaping="yes"/>
  -->
  <xsl:template match="/">
        <xsl:variable name="frags"><xsl:value-of select="$fragments" disable-output-escaping="yes"/></xsl:variable>
        
        <MediaHAVEN_external_metadata>
        <xsl:copy-of select="/MediaHAVEN_external_metadata/title"/>
        <xsl:copy-of select="/MediaHAVEN_external_metadata/description"/>
        <xsl:copy-of select="/MediaHAVEN_external_metadata/version"/>
        <xsl:copy-of select="/MediaHAVEN_external_metadata/name"/>
        <xsl:copy-of select="/MediaHAVEN_external_metadata/MDProperties"/>
        <xsl:value-of select="$frags" disable-output-escaping="yes"/>          
       
         </MediaHAVEN_external_metadata>
         
         <!-- 
          <xsl:for-each select="$test/fragments/fragment">
          
            <fragment>
            BLA
              <title><xsl:value-of select="title"/></title>
               
              <description><xsl:value-of select="description"/></description>
              <original_start_z><xsl:value-of select="original_start_z"/></original_start_z>
              <original_end_z><xsl:value-of select="original_end_z"/></original_end_z>
             
            </fragment>
           
          </xsl:for-each>
          -->
          
            
  </xsl:template>
</xsl:stylesheet>