//==============================================
// Default configurations
//==============================================

const Config = {

  USER_POOL_ID: 'ap-northeast-1_skspMo3sj',
  CLIENT_ID: 'uv43acg70f7c9s7o276luu4ao',
  IDENTITY_POOL_ID: 'ap-northeast-1:3afc4907-90db-4f83-95b1-e97e10b2abc1',
  REGION: 'ap-northeast-1',  // AWS Cognito をデプロイしているリージョン

  // TODO 設定値を確認
  PROFILE_IMAGES_S3_BUCKET: 'oshidori-userfiles-mobilehub-519680190',

  // API Gateway のエンドポイント（開発）
  API_ENDPOINT: 'https://856mv464xk.execute-api.ap-northeast-1.amazonaws.com/Development',

  DEVELOPER_MODE: false, // 自動ログインを有効化
  CODE_VERSION: '1.0.0',
  DEFAULT_USERNAMES: ['user1', 'admin1'] // default users cannot change their passwords
};

export { Config }
