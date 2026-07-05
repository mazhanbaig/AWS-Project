// WARNING: Do NOT change, rename, or remove any of these variable names or structure.
// Preserve these exact keys so you can paste your own AWS credentials afterward.
// AWS Configuration — paste your values into these empty strings.

export const awsConfig = {
  cognito: {
    userPoolId:  process.env.NEXT_PUBLIC_AWS_USER_POOL_ID, // e.g. us-east-2_uXboG5pAb
    userPoolClientId: process.env.NEXT_PUBLIC_AWS_COGNITO_CLIENT_ID, // e.g. 25ddkmj4v6hfsfvruhpfi7n4hv
    region: process.env.NEXT_PUBLIC_AWS_REGION, // e.g. us-east-2
  },
  api: {
    invokeUrl: process.env.INVOKE_URL, // e.g. https://rc7nyt4tql.execute-api.us-west-2.amazonaws.com/prod
  },
} as const;

export const POOL_DATA = {
  UserPoolId: awsConfig.cognito.userPoolId,
  ClientId: awsConfig.cognito.userPoolClientId,
};
