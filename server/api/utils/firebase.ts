import admin from 'firebase-admin';

var serverConfig: any = {
  type: 'service_account',
  project_id: 'mastering-nuxt-3-9e7fb',
  private_key_id: '34a68a698cbef95ab13929b8957ca05363e765a6',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDJmKyQER8swRZW\nEyINFtqjSdZ0VfkViS2Ds/v4wRdtlg2L43gQPJZX4k/Zba1RDkvMDdC3B2C7J80C\nBrgLP7iKE0w0+vAA6yJxH+C1SL1DZ2r+qzMRbTM1YQPkf3UhVWJtJy04XWzg4IK0\nzSx8D5TGv3PUEedob8Grkna+iXsKO3Q1Ch0O3TZ/FvtzBep68BV0Wp0/22mjul0V\nzP8DI9wZOOYjRJeAjwqyEjSBPyBPayBAtGqI95XIo0tD65tOA9FGvKRVnQfSXCJy\nI+svDMSjB6G/Q7B+O2RsstM79xjUjndmawSFyehq36JcZmeUr/7EETyvNplwE28L\nn0WSnewnAgMBAAECggEAAeHU+LAIPEaQ2vywMANIVVMq6k+yXAhkOjCTwNTtt4e+\nd0NiZWowbtpS7gs/966/Pvj3mmxgOqf7yYv2jKCiGU7hcfw4hqNyeNrCw1Y7NDRc\nz1llpxZsvyxfUM0/UYEJtGElpW89RTvXhXNRwQXNoCRLV1h5vkPan8NS830on+ch\nQN2vUJohym5dhriLlOIYQSn54pA9ZdNxVqb0iGnacMMBFKfngyXVDWht5A/bs5ZI\nn9lAu+EIIB3vaKnnxXHwbkYPjwXEUz5nSwd57xxlGdpI75AkMgcNMqxsmiM+uWAH\nacjyLsUiXURhjeanyPEvhUkGw8suRTP5gZDQP6ZwdQKBgQDj0jYZqefvcCL1GOQP\nFQjVUZ6o/yl5yaKriSWOIYBLvgdBMKPbXwk2JkJ1WREDJDQt8cXoruisHdSAp1RG\ndWHlVcuhHXzOGzDV56Wl5EHXIlTtGmLbAkqISSsPsSzdG7qL/rUPvegmsNQjIp9E\nWTFLEAou282wMl4+XFGa2Fc6kwKBgQDiiBM/ANaOKH6xNGyPZ7ZZjpMKOY+rIY6A\nZT3IP3u1IlTkyS6/FZgQCvqBsDsLI5TTPuP5ZtX4oNd/Qp9I6D/icjQ79CAYcPxK\n0W/d+7YRHAPEmUVBY44yN6Gydof0AszRaT/gHpyM0Yrg1SMi75fEQ9k6KEnCxFGi\nblmvJsUAnQKBgCmLWOA/MpNgQI+vdU8mx9CWrLcmqLqTwX1EajvL8ihdw9bodsj3\nQKfGPFJH5qlK/dTvBOcUlktkuS6o1N5wY2S9y39a8DppjPNE5dklkbgYg6IlMKe9\neDf4F8kpxwOfHdqPnRb8y4varSSnGKIPHcURbLn0zUJ3POZkUWFKWEXPAoGAJUL0\nx3w/zopirItPABezKvAEx73IIAIZCo2cp/+pPZY0GJ3vDodix+DGa+atD5v+svC5\nVyDPOWJbkBdJVBi/yWO3q9TwIpUTKstgd0ccH5xYElKTzbmufhwggNZ2bnC3eAqz\n8w2V+qPNEEZ+zRRUBniSlrphx6O7Odik7+aUqRECgYAJV9Y6eXlsTrUwdTMNzUYU\neiFFinoUNEmYGKbAzLxjuRLvYlFHMnkcugU0wyXoIosttKCf7o0gYKyv3oCwBrt9\nBDTc+fBUESGAViRa5vRZWtkDypEYRihgjWp+CST5Hb5Zuu51wKTeRBdRdJVd2DVR\nufwbbjngHTp3dkDSPpWw5Q==\n-----END PRIVATE KEY-----\n',
  client_email: 'firebase-adminsdk-afl1m@mastering-nuxt-3-9e7fb.iam.gserviceaccount.com',
  client_id: '114411844604312531203',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-afl1m%40mastering-nuxt-3-9e7fb.iam.gserviceaccount.com',
  universe_domain: 'googleapis.com',
};

var app: any;

export default function initFirebase() {
  if (!app) {
    app = admin.initializeApp({
      credential: admin.credential.cert(serverConfig),
      databaseURL: 'https://mastering-nuxt-3-9e7fb-default-rtdb.firebaseio.com',
    });
  }
}
