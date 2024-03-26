
export function PageTitle({text, fontFamily = "Roboto", margin = "40px", fontSize = "48px", fontWeight = "800"}) {
  return (
  <div style={{fontSize: fontSize, fontWeight: fontWeight,
   fontFamily: fontFamily, margin: margin}}>
    {text}</div>
  )
}
