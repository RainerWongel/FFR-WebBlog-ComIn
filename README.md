Datum: 04.07.2025

---
VORAB: Grundsätzlich funktioniert die Website in jedem Browser, jedoch ist die Formatierung auf den Edge-Browser angepasst - also nach möglichkeit den verwenden ;)
---
----------------------------------------------------------------------------------------------------------------------

Dinge die funktionieren sollten:

- Anmelden

- Registrieren (neuen Nutzer anlegen)

- Posts laden (inkl. Paginator)

- neue Posts erstellen

- neue Kategorien erstellen

- neue Tags erstellen

- Ausloggen

- User löschen, aber nur wenn keine Kommentare oder Posts über den User geschrieben wurden

- Kommentare verfassen

- Kommentare kommentieren

- Posts bearbeiten

- Kommentare bearbeiten
 
- Posts löschen

- Kommentare löschen

----------------------------------------------------------------------------------------------------------------------

Dinge, die so halb oder gar nicht funktionieren:

- Paginator wird nicht korrekt auf sortierte bzw. gefilterte Posts bzw. Post-Seiten angewendet

- Paginator wird nicht korrekt auf die globale Suchleiste oben im Header angewendet | | -> Was heißt das also? --- Wenn man beispielsweise nach der Kategorie "Medizin" filtert, werden einem nur die Posts der Kategorie Medizin auf der aktuellen Seite angezeigt, beim global Search ist es ähnlich

- User löschen (Username auf Unbekannt oder gelöschten Nutzer setzen, danch das Passwort verändern und dem User mit der gelöschten ID den Login zu verwähren)

- Username ändern (funktioniert aber über direkte Request im Backend über Http)

- Passwort ändern (funktioniert aber über direkte Request im Backend über Http)

- Profilbild ändern

- Replies löschen (Kommentare von Kommentaren)

- vollständige Authentication (nur so eine halbe vorhanden mit Username ins LocalStorage Packen beim Login und diese Daten dann weiter verwenden um Schreibrechte zu überprüfen)

- Bei Fragen "Willst du XY wirklich tun?" kann man nur mit Ja oder Ok antworten lol

----------------------------------------------------------------------------------------------------------------------
Bedienungsanleitung für das Ausführen:
-----------------------------------------

Backend:

1. Datenbank richtig anbinden im ConnectionString im appsettings.json

2. ggf. NuGet Packeges Installieren, nur die relevanten für EF-Core

3. http ausführen
---------------------------------------------
Frontend:

1. npm install

2. NUR den Port: 60648 verwenden, sonst CORS Konflikte | --> ng serve --port 60648

(Posts per Site einstellen: Im Frontend unter: WebblogComInFrontend\src\app\posts\posts.component.ts, Line 90)

