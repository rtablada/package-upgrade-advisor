export interface PackageDetails {
  name: string
  keywords: string[]
  repository: {
    type: string,
    url: string,
  };
  description: string;
}
