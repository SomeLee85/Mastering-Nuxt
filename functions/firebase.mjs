import admin from 'firebase-admin';

var serverConfig = {
  type: 'service_account',
  project_id: 'nuxt-course-54f47',
  private_key_id: '8270b6cdf39cc9f11a4787a0093765568850dd6c',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQClCpmy1Ngdn04Y\nDT7ytRpg+ASmYSpIFX4y01prn7h+Dqhm+aIqD0zwcqhn908UUrCjxQkzP1BgLLKp\nBD2o18sjmFdeRD5O8dLk2uX68Q4fAgSIL45Rzb5hRB8FT0bjfj9S+dWhgX3hg07K\neQsg193XCH3QVK3GxmdGEYqWPrW4CQNtGB8O8Wf8GWRYcNG/dIE1oWW7Rh8ZMJBs\n1WgrdlkfLj9r9bNatFpgbsrNq1MoCX4AXTmnHntgrZrKcqvrXo6sWdOXNSzE7q2t\nhmb2L9eyiglHKcHOa5pyBOd9XvvfgZFrjbyfAm0CIcjc9OT31eba7vow1TIAI5S+\n/88BVDStAgMBAAECggEAKpptaZX7Ac6NNLU6oiFw4UY0wRRE+12c+ZbIeQ6+a7/x\n5b8cBtpzRIB8i3XyMm9UDLqAsPtvjpwLNIkVN6AY3qPlLb7VDMDs7Um6Y0hVmliF\nffg0t1Yyhl402cSIqpH827kFVg8cxRmFvct4PW6r4+XbwGsTfsPZheNiUH14oDw8\n38BQQuOJzQoKWbdOwJpcK0KJ7qrPSI6ZNJcMQaNly7zC92446jwD0czN0UG9vqCO\nIanUKsSp2wgOl8cfPbLi0IIL5SJBFFA0YO/RCNzvkBDCLznNeqWcofiFvnGhYffr\nlnlS3/FTowjyd4t7cnGsJVzxwqHuU3ci9A/a4tySqwKBgQDga6g4r/EsNqexsnn7\nGsiULTbL1I+J6A3N0h8/Mxcwh5m6sRGEGk0hYl8dq+PzkrOHuZgdk0LwP0TwbbdN\nzvk7qpQ1Ywd4jhmWJExEn9BZ826eswaREAsHituxTnsFLJssZ03DJF2utvK0yGHS\nvxZhMi9lu0rvhDI4BpG9yjDIhwKBgQC8Q+r4acsSK+g1Mq8sLBDWvcIdnepzCGqq\nKbM0Oc0gLTEiYAEPK/2ovzkALzch9Y6qjxKPJE0lpJ87A5WikmztkcXLIPdDLskJ\nQ6GAxm2HCaa8OZnx/a6CIKs1q09Qhb2gn8nFa4naI56M2d6iXXjp4xyztMJ/1udF\nK+/4jdjKKwKBgAbiBmTGsKTkgDwo9yjGZ4Rz5oxV1pkqLtIzMZYkoP9yCTr6l0jv\n7ZGqjLRCQ1mDFFKDVLEDhTgNGLYvB0IxqN81mhoREXeXFB3Quy4XoLJBjxD6+KaW\nUWBH1/kWKRu9hHzWJkJn6R+kqMj2pFlsVulgOqfqGKBD865YNTwW6WwdAoGAD6oj\nCepbkDaBCrQd6TH9cLC3TxmNoWao4WG43HaWv7+i3/ZXADkr0PegOYi0MKoq5bwj\n0i82EBTDfviMYcuHLrk7WOx0Rm3FInUzIfDguiSub+jnC0CNXZx0QnHvloaaQZwq\nALgy7yiZj6StJptabTONdtJqgJKUCahfPjInQKMCgYA2TOe8KkR1gQvJwvfzwb8A\nmuh54caY7g7qGxssGVLuoJa/fDkfMJYArhbPhO+a9LLQWHiHDHKa19Gu3vkYPnUT\nAVDHzr7vjNd9AJHjJZrHxVw4Idq3N2GFGqEDsNe2kw06evjueYIAzvq73ZGgLZsj\nJ71BXLBm2Y3BTZZ0+ck1YQ==\n-----END PRIVATE KEY-----\n',
  client_email: 'firebase-adminsdk-8b4t7@nuxt-course-54f47.iam.gserviceaccount.com',
  client_id: '118065138860864777737',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-8b4t7%40nuxt-course-54f47.iam.gserviceaccount.com',
  universe_domain: 'googleapis.com',
};

var app;

export default function initFirebase() {
  if (!app) {
    app = admin.initializeApp({
      credential: admin.credential.cert(serverConfig),
      databaseURL: 'https://nuxt-course-54f47-default-rtdb.firebaseio.com/',
    });
  }
}

// type: 'service_account',
// project_id: 'nuxt-course-54f47',
// private_key_id: '34a68a698cbef95ab13929b8957ca05363e765a6',
// private_key:
//   '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDJmKyQER8swRZW\nEyINFtqjSdZ0VfkViS2Ds/v4wRdtlg2L43gQPJZX4k/Zba1RDkvMDdC3B2C7J80C\nBrgLP7iKE0w0+vAA6yJxH+C1SL1DZ2r+qzMRbTM1YQPkf3UhVWJtJy04XWzg4IK0\nzSx8D5TGv3PUEedob8Grkna+iXsKO3Q1Ch0O3TZ/FvtzBep68BV0Wp0/22mjul0V\nzP8DI9wZOOYjRJeAjwqyEjSBPyBPayBAtGqI95XIo0tD65tOA9FGvKRVnQfSXCJy\nI+svDMSjB6G/Q7B+O2RsstM79xjUjndmawSFyehq36JcZmeUr/7EETyvNplwE28L\nn0WSnewnAgMBAAECggEAAeHU+LAIPEaQ2vywMANIVVMq6k+yXAhkOjCTwNTtt4e+\nd0NiZWowbtpS7gs/966/Pvj3mmxgOqf7yYv2jKCiGU7hcfw4hqNyeNrCw1Y7NDRc\nz1llpxZsvyxfUM0/UYEJtGElpW89RTvXhXNRwQXNoCRLV1h5vkPan8NS830on+ch\nQN2vUJohym5dhriLlOIYQSn54pA9ZdNxVqb0iGnacMMBFKfngyXVDWht5A/bs5ZI\nn9lAu+EIIB3vaKnnxXHwbkYPjwXEUz5nSwd57xxlGdpI75AkMgcNMqxsmiM+uWAH\nacjyLsUiXURhjeanyPEvhUkGw8suRTP5gZDQP6ZwdQKBgQDj0jYZqefvcCL1GOQP\nFQjVUZ6o/yl5yaKriSWOIYBLvgdBMKPbXwk2JkJ1WREDJDQt8cXoruisHdSAp1RG\ndWHlVcuhHXzOGzDV56Wl5EHXIlTtGmLbAkqISSsPsSzdG7qL/rUPvegmsNQjIp9E\nWTFLEAou282wMl4+XFGa2Fc6kwKBgQDiiBM/ANaOKH6xNGyPZ7ZZjpMKOY+rIY6A\nZT3IP3u1IlTkyS6/FZgQCvqBsDsLI5TTPuP5ZtX4oNd/Qp9I6D/icjQ79CAYcPxK\n0W/d+7YRHAPEmUVBY44yN6Gydof0AszRaT/gHpyM0Yrg1SMi75fEQ9k6KEnCxFGi\nblmvJsUAnQKBgCmLWOA/MpNgQI+vdU8mx9CWrLcmqLqTwX1EajvL8ihdw9bodsj3\nQKfGPFJH5qlK/dTvBOcUlktkuS6o1N5wY2S9y39a8DppjPNE5dklkbgYg6IlMKe9\neDf4F8kpxwOfHdqPnRb8y4varSSnGKIPHcURbLn0zUJ3POZkUWFKWEXPAoGAJUL0\nx3w/zopirItPABezKvAEx73IIAIZCo2cp/+pPZY0GJ3vDodix+DGa+atD5v+svC5\nVyDPOWJbkBdJVBi/yWO3q9TwIpUTKstgd0ccH5xYElKTzbmufhwggNZ2bnC3eAqz\n8w2V+qPNEEZ+zRRUBniSlrphx6O7Odik7+aUqRECgYAJV9Y6eXlsTrUwdTMNzUYU\neiFFinoUNEmYGKbAzLxjuRLvYlFHMnkcugU0wyXoIosttKCf7o0gYKyv3oCwBrt9\nBDTc+fBUESGAViRa5vRZWtkDypEYRihgjWp+CST5Hb5Zuu51wKTeRBdRdJVd2DVR\nufwbbjngHTp3dkDSPpWw5Q==\n-----END PRIVATE KEY-----\n',
// client_email: 'firebase-adminsdk-afl1m@mastering-nuxt-3-9e7fb.iam.gserviceaccount.com',
// client_id: '114411844604312531203',
// auth_uri: 'https://accounts.google.com/o/oauth2/auth',
// token_uri: 'https://oauth2.googleapis.com/token',
// auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
// client_x509_cert_url:
//   'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-afl1m%40mastering-nuxt-3-9e7fb.iam.gserviceaccount.com',
// universe_domain: 'googleapis.com',
