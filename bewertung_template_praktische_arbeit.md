# Bewertungsvorlage Praktische Arbeit

## Metadaten

* **Gruppe:** 
* **Thema / Aufgabe:** 
* **Bewertet am:** 

## Bewertungslogik

Diese Vorlage bewertet die praktische Arbeit gestaffelt:

1. Jede **Kategorie** innerhalb eines Bereichs oder Kapitels erhält eine Bewertung in **Prozent**.
2. Aus den Kategorien ergibt sich eine **prozentuale Bewertung für das jeweilige Kapitel**.
3. Aus den Kapitelwerten ergibt sich eine **Gesamtbewertung in Prozent**.
4. Zusätzlich kann am Ende eine **begründete Korrektur** vorgenommen werden, wenn einzelne besondere Aspekte durch die Kapitelbewertung nicht ausreichend abgebildet sind.

## Kapitelgewichte

| Bereich / Kapitel |   Gewicht |
|---|----------:|
| Erfüllungsgrad der fachlichen Anforderungen |      15 % |
| Kapitel 2: Grundbausteine des Internets |      15 % |
| Kapitel 3: Den Browser mit Inhalt füllen |      30 % |
| Kapitel 4: Über den Browserrand schauen |      30 % |
| Kapitel 5: Sicherheit von Web-Applikationen |      10 % |
| **Summe** | **100 %** |

## 1. Erfüllungsgrad der fachlichen Anforderungen

### Leitfragen

Die folgenden Fragen dienen als Orientierung für die Bewertung dieses Bereichs:

* **Umsetzung der Kernanforderungen**
    * Wurden die fachlichen Muss-Anforderungen der gewählten Aufgabe in einem sinnvollen Umfang umgesetzt?
    * Sind die zentralen Anwendungsfälle der Aufgabe tatsächlich benutzbar und nicht nur rudimentär angedeutet?
    * Ist erkennbar, dass die Anwendung als zusammenhängendes fachliches System funktioniert?

* **Fachliche Stimmigkeit der Umsetzung**
    * Wirkt die Umsetzung der Anforderungen in sich schlüssig und nachvollziehbar?
    * Passen Datenmodell, Benutzerführung und fachliche Abläufe zur gewählten Aufgabenstellung?
    * Ist erkennbar, dass die fachlichen Anforderungen verstanden und nicht nur technisch irgendwie umgesetzt wurden?

### Kategorien

| Kategorie | Bewertung (%) | Begründung (Optional) |
|---|---:|---|
| Umsetzung der Kernanforderungen |  |  |
| Fachliche Stimmigkeit der Umsetzung |  |  |
| **Kapitelwert** |  | z. B. Mittelwert oder bewusst begründete Gesamteinschätzung |

### Zusammenfassende Einordnung

## 2. Kapitel 2: Grundbausteine des Internets

### Leitfragen

Die folgenden Fragen dienen als Orientierung für die Bewertung dieses Kapitels:

* **Ressourcen- und URL-Modellierung der API**
    * Ist im Code erkennbar, dass die API bewusst fachlich in Ressourcen geschnitten wurde?
    * Sind Endpunkte konsistent und verständlich benannt, sodass die Modellierung nicht zufällig wirkt?
    * Werden Listen, Filter und Suchanfragen nachvollziehbar über Pfade und Query-Parameter modelliert?
    * Ist erkennbar, dass eher in Ressourcen als in technischen Einzelaktionen gedacht wurde?

* **HTTP-konforme Gestaltung der API-Kommunikation**
    * Ist im Code erkennbar, dass HTTP-Methoden bewusst und fachlich passend eingesetzt werden (`GET`, `POST`, `PATCH`/`PUT`, `DELETE`)?
    * Werden HTTP-Statuscodes so verwendet, dass ein Verständnis von Erfolgs- und Fehlerfällen erkennbar wird?
    * Sind Request- und Response-Formate konsistent und nachvollziehbar gestaltet?
    * Werden relevante Header wie `Content-Type` oder `Set-Cookie` bewusst und korrekt eingesetzt?

* **Zustandsmanagement und Sitzungsverständnis**
    * Ist im Code erkennbar, dass HTTP als zustandsloses Protokoll verstanden wurde?
    * Ist der Login-/Session-Mechanismus so umgesetzt, dass ein technisches Verständnis dahinter sichtbar wird?
    * Wurde eine sinnvolle Lösung etabliert, um Zustand über mehrere Requests hinweg zu handhaben?

### Kategorien

| Kategorie | Bewertung (%) | Begründung (Optional) |
|---|---:|---|
| Ressourcen- und URL-Modellierung der API |  |  |
| HTTP-konforme Gestaltung der API-Kommunikation |  |  |
| Zustandsmanagement und Sitzungsverständnis |  |  |
| **Kapitelwert** |  | z. B. Mittelwert oder bewusst begründete Gesamteinschätzung |

### Zusammenfassende Einordnung


## 3. Kapitel 3: Den Browser mit Inhalt füllen

### Leitfragen

Die folgenden Fragen dienen als Orientierung für die Bewertung dieses Kapitels:

* **Sinnvolle HTML-Struktur und Semantik**
    * Ist im Code erkennbar, dass passende HTML-Elemente bewusst gewählt wurden und nicht nur generische `div`-Container verwendet werden?
    * Werden Überschriften, Navigationen, Listen, Formulare und Inhalte logisch und nachvollziehbar strukturiert?
    * Ist erkennbar, dass HTML nicht nur für die Darstellung, sondern für Bedeutung und Struktur der Inhalte genutzt wurde?

* **Benutzbare Formulare und saubere Eingabeerfassung**
    * Ist im Code erkennbar, dass Formulare fachlich sinnvoll aufgebaut und mit geeigneten Eingabetypen umgesetzt wurden?
    * Erhalten Benutzerinnen und Benutzer bei ungültigen Eingaben nachvollziehbare Fehlermeldungen?
    * Ist erkennbar, dass clientseitige Validierung bewusst zur Verbesserung der Bedienbarkeit eingesetzt wird?

* **Angemessene Interaktivität im Frontend**
    * Ist im Code erkennbar, dass Benutzerinteraktionen bewusst und nachvollziehbar verarbeitet werden?
    * Ist die Interaktionslogik im Frontend so umgesetzt, dass ein Verständnis von Event-Handling und Zustandsänderungen sichtbar wird?
    * Werden DOM-Manipulationen und Event-Handling strukturiert und wartbar eingesetzt?

* **Saubere Gestaltung mit CSS**
    * Ist im Code erkennbar, dass das Styling konsistent, nachvollziehbar und strukturiert aufgebaut wurde?
    * Werden Layout-Techniken wie Flexbox oder Grid bewusst und passend eingesetzt?
    * Wirkt das CSS wartbar oder eher improvisiert und schwer nachvollziehbar?
    * Sind die implementierten Selektoren angemessen und effizient wartbar?

* **Responsive und benutzbare Oberfläche**
    * Ist im Code erkennbar, dass die Anwendung für unterschiedliche Bildschirmgrößen mitgedacht wurde?
    * Passen sich Layout, Abstände und Inhalte sinnvoll an kleinere Displays an?
    * Wurde Responsive Design eher durch flexible Grundlagen als durch viele punktuelle Notlösungen umgesetzt?

### Kategorien

| Kategorie | Bewertung (%) | Begründung (Optional) |
|---|---:|---|
| Sinnvolle HTML-Struktur und Semantik |  |  |
| Benutzbare Formulare und saubere Eingabeerfassung |  |  |
| Angemessene Interaktivität im Frontend |  |  |
| Saubere Gestaltung mit CSS |  |  |
| Responsive und benutzbare Oberfläche |  |  |
| **Kapitelwert** |  | z. B. Mittelwert oder bewusst begründete Gesamteinschätzung |

### Zusammenfassende Einordnung

Kurzfazit:

## 4. Kapitel 4: Über den Browserrand schauen

### Leitfragen

Die folgenden Fragen dienen als Orientierung für die Bewertung dieses Kapitels:

* **Sinnvolle Trennung von Frontend, Backend und Datenhaltung**
    * Ist im Code erkennbar, dass Frontend, Backend und Datenhaltung als unterschiedliche Verantwortungsbereiche verstanden wurden?
    * Liegt die fachliche Wahrheit über Daten, Berechtigungen und Zustände auf dem Server und nicht im Frontend?
    * Wirkt die Architektur bewusst geschnitten oder eher zufällig gewachsen?

* **Strukturierte Umsetzung des Backends**
    * Ist im Code erkennbar, dass Routing, Request-Verarbeitung und Geschäftslogik sauber voneinander getrennt wurden?
    * Werden die Mechanismen des Webserver-Frameworks nachvollziehbar und strukturiert eingesetzt?
    * Ist die Verantwortlichkeit einzelner Module, Dateien oder Funktionen klar erkennbar?

* **Bewusster Umgang mit Middleware, Parsing und Fehlerbehandlung**
    * Ist im Code erkennbar, dass Middleware gezielt für wiederkehrende Aufgaben eingesetzt wird?
    * Werden Request-Daten strukturiert verarbeitet, statt ad hoc an vielen Stellen manuell behandelt zu werden?
    * Gibt es eine nachvollziehbare und konsistente Fehlerbehandlung im Backend?

* **Sinnvolle Datenmodellierung und Datenbankzugriff**
    * Ist im Code erkennbar, dass die Datenbankstruktur fachlich zur Anwendung passt?
    * Werden Datenbankzugriffe nachvollziehbar und strukturiert umgesetzt, statt nur punktuell zusammengebaut zu werden?
    * Ist erkennbar, dass die Brücke zwischen Anwendungslogik und relationaler Datenhaltung bewusst gestaltet wurde?
    * Wurde angemessen mit dem object-relational impedence mismatch umgegangen, falls vorhanden?
    * Falls verwendet, wurde das gewählte ORM idiomatisch verwendet?

* **Verständnis von serverseitigem Zustand und Authentifizierung**
    * Ist im Code erkennbar, dass serverseitiger Zustand bewusst behandelt wird, falls vorhanden?
    * Wird Authentifizierung so umgesetzt, dass ein technisches Verständnis von Sessions, Cookies oder Tokens sichtbar wird?
    * Ist die gewählte Lösung für das Projekt nachvollziehbar, konsistent und angemessen?

### Kategorien

| Kategorie | Bewertung (%) | Begründung (Optional) |
|---|---:|---|
| Sinnvolle Trennung von Frontend, Backend und Datenhaltung |  |  |
| Strukturierte Umsetzung des Backends |  |  |
| Bewusster Umgang mit Middleware, Parsing und Fehlerbehandlung |  |  |
| Sinnvolle Datenmodellierung und Datenbankzugriff |  |  |
| Verständnis von serverseitigem Zustand und Authentifizierung |  |  |
| **Kapitelwert** |  | z. B. Mittelwert oder bewusst begründete Gesamteinschätzung |

### Zusammenfassende Einordnung

Kurzfazit:

## 5. Kapitel 5: Sicherheit von Web-Applikationen

### Leitfragen

Die folgenden Fragen dienen als Orientierung für die Bewertung dieses Kapitels:

* **Erkennbares Sicherheitsbewusstsein im Code**
    * Ist im Code erkennbar, dass Sicherheit als Teil der Implementierung mitgedacht wurde und nicht nur als nachträglicher Zusatz?
    * Werden typische Risiken einer Web-Applikation sichtbar berücksichtigt?
    * Wirkt der Umgang mit Sicherheitsaspekten bewusst und angemessen oder eher zufällig?

* **Sicherer Umgang mit Authentifizierung und sensitiven Daten**
    * Ist im Code erkennbar, dass Passwörter und andere sensitive Daten angemessen behandelt werden?
    * Werden Passwörter sicher gehasht gespeichert und nicht im Klartext verarbeitet oder abgelegt?
    * Werden Sessions, Cookies oder Tokens so verwendet, dass ein Bewusstsein für typische Risiken erkennbar wird?

* **Schutz vor typischen Injection- und Script-Angriffen**
    * Ist im Code erkennbar, dass Benutzereingaben nicht unkontrolliert in SQL-Statements oder HTML-Ausgaben gelangen?
    * Werden Mechanismen eingesetzt, die SQL-Injection und XSS nachvollziehbar erschweren?
    * Werden naheliegende Schutzmechanismen wie sichere Cookie-Attribute, sinnvolle Validierung oder begrenzende Maßnahmen nachvollziehbar eingesetzt?

* **Sinnvolle Zugriffskontrolle und Autorisierung**
    * Ist im Code erkennbar, dass die Konzepte von Authentifizierung und Autorisierung verstanden wurden?
    * Werden geschützte Aktionen und Daten serverseitig kontrolliert und nicht nur im Frontend versteckt?
    * Ist nachvollziehbar geregelt, welche Nutzer welche Daten sehen oder verändern dürfen?

### Kategorien

| Kategorie | Bewertung (%) | Begründung (Optional) |
|---|---:|---|
| Erkennbares Sicherheitsbewusstsein im Code |  |  |
| Sicherer Umgang mit Authentifizierung und sensitiven Daten |  |  |
| Schutz vor typischen Injection- und Script-Angriffen |  |  |
| Sinnvolle Zugriffskontrolle und Autorisierung |  |  |
| **Kapitelwert** |  | z. B. Mittelwert oder bewusst begründete Gesamteinschätzung |

### Zusammenfassende Einordnung

Kurzfazit:

## 6. Weitere berücksichtigte Aspekte

Dieser Abschnitt dient für begründete Korrekturen, wenn einzelne positive oder negative Aspekte durch die obigen Kapitel nicht angemessen abgebildet werden.

### Mögliche Aspekte

* besonders gelungene oder besonders schwache Umsetzung optionaler Anforderungen
* sinnvoller oder problematischer Einsatz zusätzlicher Technologien, Bibliotheken oder Architekturmuster
* erkennbar zusätzlicher Aufwand mit fachlich sinnvollem Mehrwert
* unnötige technische Komplexität
* sonstige relevante positive oder negative Beobachtungen

### Korrektur

| Korrektur in Prozentpunkten | Begründung |
|---|---|
|  |  |

## 7. Gesamtauswertung

### Kapitelwerte

| Bereich / Kapitel | Kapitelwert (%) | Gewicht | Beitrag zur Gesamtbewertung |
|---|---:|---:|---:|
| Erfüllungsgrad der fachlichen Anforderungen |  | 15 % |  |
| Kapitel 2: Grundbausteine des Internets |  | 15 % |  |
| Kapitel 3: Den Browser mit Inhalt füllen |  | 30 % |  |
| Kapitel 4: Über den Browserrand schauen |  | 30 % |  |
| Kapitel 5: Sicherheit von Web-Applikationen |  | 10 % |  |
| Zwischensumme |  | 100 % |  |
| Korrektur |  |  |  |
| **Gesamtbewertung praktische Arbeit** |  |  |  |
