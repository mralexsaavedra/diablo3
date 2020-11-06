import classes from '../utils/heroClassess'

function useHeroName () {
  const classToName = (classSlug: string) => {
    return classes[classSlug]
  }

  return {
    classToName
  }
}

export default useHeroName
