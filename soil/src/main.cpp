#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <DHT.h>

#define DHT_PIN 15
#define DHT_TYPE DHT22
#define PIN_PH 34
#define PIN_N  32
#define PIN_P  33
#define PIN_K  35
#define BUTTON_PIN 13

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define STABILITY_THRESHOLD 2.0
#define STABILITY_COUNT 3

DHT dht(DHT_PIN, DHT_TYPE);
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

float humidity, temperature, ph, nitrogen, phosphorus, potassium;
float prevH, prevPH, prevN, prevP, prevK;
int stableCount = 0;
bool dataSaved = false;

float readAnalog(int pin, float maxVal) {
  return (analogRead(pin) / 4095.0) * maxVal;
}

bool isStable() {
  return (abs(humidity   - prevH)  < STABILITY_THRESHOLD &&
          abs(ph         - prevPH) < STABILITY_THRESHOLD &&
          abs(nitrogen   - prevN)  < STABILITY_THRESHOLD &&
          abs(phosphorus - prevP)  < STABILITY_THRESHOLD &&
          abs(potassium  - prevK)  < STABILITY_THRESHOLD);
}

void saveCSV() {
  Serial.println("--- AUTO SAVE ---");
  Serial.println("humidity,temperature,pH,N,P,K");
  Serial.print(humidity, 1);   Serial.print(",");
  Serial.print(temperature, 1); Serial.print(",");
  Serial.print(ph, 2);         Serial.print(",");
  Serial.print(nitrogen, 1);   Serial.print(",");
  Serial.print(phosphorus, 1); Serial.print(",");
  Serial.println(potassium, 1);
}

void sendToML() {
  Serial.println("--- SENDING TO ML ---");
  Serial.print("{\"humidity\":");    Serial.print(humidity, 1);
  Serial.print(",\"temperature\":"); Serial.print(temperature, 1);
  Serial.print(",\"pH\":");          Serial.print(ph, 2);
  Serial.print(",\"N\":");           Serial.print(nitrogen, 1);
  Serial.print(",\"P\":");           Serial.print(phosphorus, 1);
  Serial.print(",\"K\":");           Serial.print(potassium, 1);
  Serial.println("}");
}

void updateOLED(bool stable) {
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(0, 0);
  display.println("-- Soil Readings --");
  display.print("Hum: "); display.print(humidity, 1); display.println("%");
  display.print("Temp:"); display.print(temperature, 1); display.println("C");
  display.print("pH: "); display.println(ph, 2);
  display.print("N:"); display.print(nitrogen, 1);
  display.print(" P:"); display.print(phosphorus, 1);
  display.print(" K:"); display.println(potassium, 1);
  display.setCursor(0, 56);
  display.print(stable ? "STABLE - Press btn" : "Reading...");
  display.display();
}

void setup() {
  Serial.begin(115200);
  dht.begin();
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  display.clearDisplay();
  delay(500);
}

void loop() {
  humidity    = dht.readHumidity();
  temperature = dht.readTemperature();
  ph          = readAnalog(PIN_PH, 14.0);
  nitrogen    = readAnalog(PIN_N, 100.0);
  phosphorus  = readAnalog(PIN_P, 100.0);
  potassium   = readAnalog(PIN_K, 100.0);

  if (isnan(humidity) || isnan(temperature)) {
    Serial.println("DHT read failed");
    delay(1000);
    return;
  }

  if (isStable()) {
    stableCount++;
  } else {
    stableCount = 0;
    dataSaved = false;
  }

  bool stable = stableCount >= STABILITY_COUNT;

  if (stable && !dataSaved) {
    saveCSV();
    dataSaved = true;
  }

  if (digitalRead(BUTTON_PIN) == LOW && stable) {
    sendToML();
    delay(500);
  }

  updateOLED(stable);

  prevH  = humidity;
  prevPH = ph;
  prevN  = nitrogen;
  prevP  = phosphorus;
  prevK  = potassium;

  delay(1000);
}