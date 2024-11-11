export type TokenCard = {
  collectionAddress: string
  tokenId: string
  description?: string | null
  name?: string
  eventId?: string
  imageURI?: string | null
  tokenURI?: null
}

export type Token = {
  collectionAddress: string
  tokenId: string
  tokenStandard: string
  description?: string | null
  name?: string
  eventId?: string
  imageURI?: string | null
  tokenURI?: null
  attributes?: Array<Attribute>
}

export type TokenDetail = {
  collectionAddress: string
  tokenId: string
  tokenStandard: string
}

export interface Attribute {
  traitType: string;
  value: string;
  count: number;
  displayType?: string;
}
