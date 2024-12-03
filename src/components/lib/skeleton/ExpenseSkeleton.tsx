import ContentLoader, { IContentLoaderProps } from 'react-content-loader'

export const ExpenseSkeleton = (props: IContentLoaderProps) => (
  <ContentLoader width={300} height={85} viewBox="0 0 300 85" {...props}>
    <rect x="0" y="0" rx="16" ry="16" width="12" height="85" />
    <rect x="0" y="0" rx="16" ry="16" width="300" height="5" />
    <rect x="0" y="80" rx="16" ry="16" width="300" height="5" />
    <rect x="295" y="0" rx="16" ry="16" width="5" height="85" />
    <rect x="30" y="25" rx="3" ry="3" width="75" height="10" />
    <rect x="30" y="50" rx="3" ry="3" width="115" height="10" />
    <rect x="250" y="50" rx="3" ry="3" width="35" height="10" />
  </ContentLoader>
)
