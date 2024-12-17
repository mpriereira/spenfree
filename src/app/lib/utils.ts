export const getCategoryColor = (categoryId: number) => {
  switch (categoryId) {
    case 1:
      return '#3993DD'
    case 2:
      return '#6A3E37'
    case 3:
      return '#EE4266'
    case 4:
      return '#0EAD69'
    case 5:
      return '#FFD23F'
    default:
      return '#ccc'
  }
}
