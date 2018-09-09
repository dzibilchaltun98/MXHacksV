#include <math.h>
#include <ESP8266WiFi.h>
#include "WifiLocation.h"
 
//#define GOOGLE_KEY "AIzaSyAHWjLzhD4s5wcbR319leDr_3ddbtqOhGk" // Clave API Google Geolocation
//#define SSID "LAPTO-MDPHVD463516" // SSID de tu red WiFi
//#define PASSWD "upiita2018" // Clave de tu red WiFi
#define HOSTFIREBASE "test-b1cf5.firebaseio.com" // Host o url de Firebase
#define LOC_PRECISION 7 // Precisión de latitud y longitud

//const char* ssid = "MotoV";
//const char* password = "pooe2018";
//
const char* ssid = "LAPTOP-MDPHVD46 3516";
const char* password = "upiita2018";


//const char* ssid = "mxhacks_esquina3";
//const char* password = "hackaton";

const char* googleApiKey = "AIzaSyDs42Mavz7LJsnPC35e3fOOaLTD39rWbAQ";

const String ID = "LLtamXyzO0nrMusQ8qq";
const int B = 4275;
const int R0 = 100000;
const int pinTempSensor = A0;
//const int led = D0;

 
// Llamada a la API de Google
//WifiLocation location(GOOGLE_KEY);
WifiLocation location(googleApiKey);
location_t loc; // Estructura de datos que devuelve la librería WifiLocation
 
// Variables
byte mac[6];
String macStr = "";
String nombreComun = "NodeMCU";
 
// Cliente WiFi
WiFiClientSecure client;
 
void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  // Conexión con la red WiFi

  while (WiFi.status() != WL_CONNECTED) {
     delay(500);
     Serial.print(".");
  }
/*  while (WiFi.status() != WL_CONNECTED) {
    Serial.print("Attempting to connect to WPA SSID: ");
    Serial.println(SSID);
    // Connect to WPA/WPA2 network:
    WiFi.begin(SSID, PASSWD);
    // wait 5 seconds for connection:
    delay(5000);
    Serial.print("Status = ");
    Serial.println(WiFi.status());
  }*/
  //print a new line, then print WiFi connected and the IP address
  Serial.println("");
  Serial.println("WiFi connected");
  // Print the IP address
  Serial.println(WiFi.localIP());
 
  // Obtenemos la MAC como cadena de texto
  macStr = obtenerMac();
 
  Serial.print("MAC NodeMCU: ");
  Serial.println(macStr);
  pinMode(D0,OUTPUT);
}
 
void loop() {

  
  float temperature = 0;
  
  while (temperature < 33){
  int a = analogRead(pinTempSensor);
  digitalWrite(D0,LOW);
  float R = 1023.0/a-1.0;
  R = R0*R;
  
  temperature = 1.0/(log(R/R0)/B+1/298.15)-273.15;
  Serial.print("Temperatura = ");
  Serial.println(temperature);
    
  delay(100);
  }

  digitalWrite(D0,HIGH);
  
  // Obtenemos la geolocalización WiFi
  loc = location.getGeoFromWiFi();
 
  // Mostramos la información en el monitor serie
  Serial.println("Location request data");
  Serial.println(location.getSurroundingWiFiJson());
  Serial.println("Latitude: " + String(loc.lat, 7));
  Serial.println("Longitude: " + String(loc.lon, 7));
  Serial.println("Accuracy: " + String(loc.accuracy));
 
  // Hacemos la petición HTTP mediante el método PUT
  peticionPut();
 
  // Esperamos 15 segundos
  delay(5000);
}
 
/********** FUNCIÓN PARA OBTENER MAC COMO STRING **********/
String obtenerMac()
{
  // Obtenemos la MAC del dispositivo
  WiFi.macAddress(mac);
 
  // Convertimos la MAC a String
  String keyMac = "";
  for (int i = 0; i < 6; i++)
  {
    String pos = String((uint8_t)mac[i], HEX);
    if (mac[i] <= 0xF)
      pos = "0" + pos;
    pos.toUpperCase();
    keyMac += pos;
    if (i < 5)
      keyMac += ":";
  }
 
  // Devolvemos la MAC en String
  return keyMac;
}
 
/********** FUNCIÓN QUE REALIZA LA PETICIÓN PUT **************/
void peticionPut()
{
  // Cerramos cualquier conexión antes de enviar una nueva petición
  client.stop();
  client.flush();
  // Enviamos una petición por SSL
  if (client.connect(HOSTFIREBASE, 443)) {
    // Petición PUT JSON
    String toSend = "PUT /dispositivo/";
    toSend += ID;
    toSend += "//";
    toSend += "MAC:";
    toSend += macStr;
    //toSend += "\"}";
    //toSend += "\r\n";
    toSend += ".json HTTP/1.1\r\n";
    toSend += "Host:";
    toSend += HOSTFIREBASE;
    toSend += "\r\n" ;
    toSend += "Content-Type: application/json\r\n";
    String payload = "{\"lat\":";
    payload += String(loc.lat, LOC_PRECISION);
    payload += ",";
    payload += "\"lon\":";
    payload += String(loc.lon, LOC_PRECISION);
    payload += ",";
    payload += "\"prec\":";
    payload += String(loc.accuracy);
    payload += ",";
    payload += "\"nombre\": \"";
    payload += nombreComun;
    payload += "\"}";
    payload += "\r\n";
    toSend += "Content-Length: " + String(payload.length()) + "\r\n";
    toSend += "\r\n";
    toSend += payload;
    Serial.println(toSend);
    client.println(toSend);
    client.println();
    client.flush();
    client.stop();
    Serial.println("Todo OK");
  } else {
    // Si no podemos conectar
    client.flush();
    client.stop();
    Serial.println("Algo ha ido mal");
  }
}
