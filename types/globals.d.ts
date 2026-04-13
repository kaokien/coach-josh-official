export {};

declare global {
  interface CustomJwtSessionClaims {
    publicMetadata?: {
      hasBlueprintAccess?: boolean;
    };
  }
}
