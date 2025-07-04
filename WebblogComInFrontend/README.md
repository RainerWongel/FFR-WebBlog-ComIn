Autor: Friedrich Froh
Datum: 04.07.2025

Anmerkungen:

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Dinge die funktionieren sollten:

1. Anmelden
2. Registrieren (neuen Nutzer anlegen)
3. Posts laden (inkl. Paginator)
4. neue Posts erstellen
5. neue Kategorien erstellen
6. neue Tags erstellen
7. Ausloggen
8. User löschen, aber nur wenn keine Kommentare oder Posts über den User geschrieben wurden
9. Kommentare verfassen
10. Kommentare kommentieren
11. Posts bearbeiten
12. Kommentare bearbeiten
13. Posts löschen
14. Kommentare löschen

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Dinge, die so halb oder gar nicht funktionieren:

1. Paginator wird nicht korrekt auf sortierte bzw. gefilterte Posts bzw. Post-Seiten angewendet
2. Paginator wird nicht korrekt auf die globale Suchleiste oben im Header angewendet
|
|
-> Was heißt das also? --- Wenn man beispielsweise nach der Kategorie "Medizin" filtert, werden einem nur die Posts der Kategorie Medizin auf der aktuellen Seite angezeigt, beim 
                           global Search ist es ähnlich
3. User löschen (Username auf Unbekannt oder gelöschten Nutzer setzen, danch das Passwort verändern und dem User mit der gelöschten ID den Login zu verwähren)
4. Username ändern (funktioniert aber über direkte Request im Backend über Http)
5. Passwort ändern (funktioniert aber über direkte Request im Backend über Http)
6. Profilbild ändern
7. Replies löschen (Kommentare von Kommentaren)
8. vollständige Authentication (nur so eine halbe vorhanden mit Username ins LocalStorage Packen beim Login und diese Daten dann weiter verwenden um Schreibrechte zu überprüfen)
9. Bei Fragen "Willst du XY wirklich tun?" kann man nur mit Ja oder Ok antworten lol

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Bedienungsanleitung für das Ausführen:

Backend:
1. Datenbank richtig anbinden im ConnectionString im appsettings.json
2. ggf. NuGet Packeges Installieren, nur die relevanten für EF-Core

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Frontend:
1. npm install
2. NUR den Port: 60648 verwenden, sonst CORS Konflikte
|
--> ng serve --port 60648

3. Posts per Site einstellen: Im Frontend unter: WebblogComInFrontend\src\app\posts\posts.component.ts, Line 90