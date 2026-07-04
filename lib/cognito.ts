import {
  CognitoUserPool,
  CognitoUserAttribute,
  AuthenticationDetails,
  CognitoUser,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';
import { awsConfig, POOL_DATA } from './aws-config';
import type { CognitoError } from '@/types';

function toUsername(email: string): string {
  return email.replace('@', '-at-');
}

function createCognitoUser(email: string): CognitoUser {
  return new CognitoUser({
    Username: toUsername(email),
    Pool: userPool,
  });
}

let userPool: CognitoUserPool;

function getPool(): CognitoUserPool | null {
  if (
    !awsConfig.cognito.userPoolId ||
    !awsConfig.cognito.userPoolClientId ||
    !awsConfig.cognito.region
  ) {
    return null;
  }
  if (!userPool) {
    userPool = new CognitoUserPool(POOL_DATA);
  }
  return userPool;
}

export function isConfigured(): boolean {
  return !!(
    awsConfig.cognito.userPoolId &&
    awsConfig.cognito.userPoolClientId &&
    awsConfig.cognito.region
  );
}

export function signUp(
  email: string,
  password: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    const pool = getPool();
    if (!pool) {
      reject(new Error('Cognito User Pool is not configured. Check lib/aws-config.ts'));
      return;
    }

    const dataEmail = { Name: 'email', Value: email };
    const attributeEmail = new CognitoUserAttribute(dataEmail);

    pool.signUp(
      toUsername(email),
      password,
      [attributeEmail],
      [] as unknown as CognitoUserAttribute[],
      (err) => {
        if (err) {
          reject(err as CognitoError);
        } else {
          resolve();
        }
      }
    );
  });
}

export function signIn(
  email: string,
  password: string
): Promise<CognitoUserSession> {
  return new Promise((resolve, reject) => {
    const pool = getPool();
    if (!pool) {
      reject(new Error('Cognito User Pool is not configured. Check lib/aws-config.ts'));
      return;
    }

    const authenticationDetails = new AuthenticationDetails({
      Username: toUsername(email),
      Password: password,
    });

    const cognitoUser = createCognitoUser(email);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (session: CognitoUserSession) => {
        resolve(session);
      },
      onFailure: (err: CognitoError) => {
        reject(err);
      },
    });
  });
}

export function verify(
  email: string,
  code: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    const pool = getPool();
    if (!pool) {
      reject(new Error('Cognito User Pool is not configured. Check lib/aws-config.ts'));
      return;
    }

    const cognitoUser = createCognitoUser(email);
    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        reject(err as CognitoError);
      } else {
        resolve(result);
      }
    });
  });
}

export function getAuthToken(): Promise<string | null> {
  return new Promise((resolve, reject) => {
    const pool = getPool();
    if (!pool) {
      resolve(null);
      return;
    }

    const cognitoUser = pool.getCurrentUser();
    if (!cognitoUser) {
      resolve(null);
      return;
    }

    cognitoUser.getSession((err: CognitoError | null, session: CognitoUserSession | null) => {
      if (err) {
        reject(err);
      } else if (!session || !session.isValid()) {
        resolve(null);
      } else {
        resolve(session.getIdToken().getJwtToken());
      }
    });
  });
}

export function signOut(): void {
  const pool = getPool();
  if (pool) {
    const cognitoUser = pool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.signOut();
    }
  }
}
