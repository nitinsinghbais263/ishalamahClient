export function valueString(state,props){
  return (state == "") ? state : (state || props)
}
