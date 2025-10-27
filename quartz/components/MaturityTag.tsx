import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

// Named export for better debugging
const MaturityTag = ({ fileData }: QuartzComponentProps) => {
  const maturity = fileData.frontmatter?.maturity
  if (!maturity) {
    console.log('No maturity value found in frontmatter')
    return null
  }
  
  const cleanMaturity = String(maturity).replace(/^['"]|['"]$/g, '')
  
  console.log('Rendering MaturityTag with:', cleanMaturity)

  return (
    <div 
      class="maturity-tag" 
      style={{ 
        display: 'inline-block',
        padding: '0.5em 1em',
        borderRadius: '4px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: '2px solid #388E3C',
        fontSize: '1em',
        fontWeight: 'bold',
        margin: '0.5em 0',
        textAlign: 'center',
        width: '100%',
        boxSizing: 'border-box'
      }}
      data-maturity={cleanMaturity}
    >
      🔍 Maturity: {cleanMaturity}
    </div>
  )
}

MaturityTag.css = `
  .maturity-tag {
    font-family: var(--fonts);
    opacity: 1 !important;
  }
  
  .maturity-tag[style*="display: none"] {
    display: block !important;
  }
`

export default (() => MaturityTag) satisfies QuartzComponentConstructor
