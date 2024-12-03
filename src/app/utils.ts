export const getCategoryColor = (categoryId: number) => {
  switch (categoryId) {
    case 1:
      return '#0cc'
    case 2:
      return '#c60'
    case 3:
      return '#f0f'
    case 4:
      return '#0c0'
    case 5:
      return '#00c'
    default:
      return '#ccc'
  }
}
