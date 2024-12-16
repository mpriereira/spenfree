import ContentLoader, { IContentLoaderProps } from 'react-content-loader'

const PieChartSkeleton = (props: IContentLoaderProps) => (
  <ContentLoader viewBox="0 0 400 200" height={200} width={400} {...props}>
    <rect x="100" y="5" rx="0" ry="0" width="200" height="15" />
    <circle cx="140" cy="110" r="70" />
    <rect x="230" y="50" rx="0" ry="0" width="7" height="7" />
    <rect x="250" y="50" rx="0" ry="0" width="30" height="7" />
    <rect x="230" y="64" rx="0" ry="0" width="7" height="7" />
    <rect x="250" y="64" rx="0" ry="0" width="30" height="7" />
    <rect x="230" y="78" rx="0" ry="0" width="7" height="7" />
    <rect x="250" y="78" rx="0" ry="0" width="30" height="7" />
    <rect x="230" y="92" rx="0" ry="0" width="7" height="7" />
    <rect x="250" y="92" rx="0" ry="0" width="30" height="7" />
  </ContentLoader>
)

const ExpenseSkeleton = (props: IContentLoaderProps) => (
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

export { PieChartSkeleton, ExpenseSkeleton }
