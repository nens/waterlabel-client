
export function joinAssetWithAssetType (asset, allAssetTypes) {
  const assetType = findAssetTypeByCode(asset.asset_type, allAssetTypes);
  // asset is found in asset types
  if (assetType) {
    asset.code = assetType.code;
    asset.name = assetType.name;
    asset.category = assetType.category;
    asset.description = assetType.description;
  } 
  // asset is not found in asset types, is it new type ?
  else {
    // what todo here? add category for new types ? but this should be in agreement with backend
    // other option would be to throw exception or ignore silently agghh
  }
  return asset;
}

export function findAssetTypeByCode (code, allAssetTypes) {
  return allAssetTypes.filter(e=>e.code === code)[0] || null;
}

export function assetDataToAssetPost (asset) {
  return {
    asset_type :      asset.code,
    storage:          asset.storage,
    infiltration:     asset.infiltration,
    area:             asset.area,
    sewer_connection: asset.sewer_connection,
  }
}