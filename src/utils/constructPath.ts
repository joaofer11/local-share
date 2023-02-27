export const constructPath = (path: string) => {
  const regexToFindPlaceholders = /:([\w\-]+)/g
  const regexToValidatePathParams = '(?<$1>[\\w\\-]+)'

  // Method will iterate on "path" finding for the placeholder
  // patern; and for each placeholder, it will put the name
  // of the first group (parenthesis defined the placeholder name)
  // and merge with new regex for validate.
  const transformedPathWithRegex = path.replaceAll(
    regexToFindPlaceholders, 
    regexToValidatePathParams
  )

  return new RegExp(`^${transformedPathWithRegex}(\/)?$`)
}
