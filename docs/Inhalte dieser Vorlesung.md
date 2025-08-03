---
sidebar_position: 1
---

## 1. Kategorien von Web-Applikationen


In diesem Abschnitt geht es um die grundlegende Frage: Was ist eine Web Applikation? Dabei werden Definition,
typische Merkmale sowie die Abgrenzung zu nativen und hybriden Apps behandelt.
Anschließend folgt eine Übersicht über verschiedene Kategorien von Web Applikationen 
– unterschieden nach ihrem Interaktivitätsgrad 
(z. B. statische Seiten, dynamische Seiten, SPAs, PWAs, Web-APIs), nach ihrem Einsatzzweck 
(z. B. Content-Plattformen, transaktionsorientierte Systeme oder soziale Netzwerke) 
sowie nach ihrer technischen Architektur (clientseitiges, serverseitiges und hybrides Rendering).

## 2. Grundbausteine des Internets

In diesem Abschnitt werden zentrale technische Grundlagen des Internets behandelt, die für das Verständnis moderner Web-Technologien essenziell sind.
Dazu gehören die wichtigsten Protokolle (IP, TCP, HTTP/S), das OSI-Modell sowie unterstützende Dienste wie DNS und TLS/SSL.
Im Fokus steht das HTTP-Protokoll mit seinem Aufbau, den HTTP-Methoden, Statuscodes, Headern, Cookies und REST-Prinzipien.
Zusätzlich werden der Aufbau von URLs sowie MIME Types und Content Negotiation erläutert.
In einer praktischen Übung analysieren die Studierenden eine einfache Beispielseite mit Tools wie curl, Postman und der Browser-Netzwerkanalyse, um die zuvor behandelten Konzepte in Aktion zu sehen.

## 3. Sprachen und Methoden des Internets

In diesem Abschnitt lernen die Studierenden die grundlegenden Technologien kennen, mit denen Webinhalte erstellt, gestaltet und interaktiv gemacht werden.
Der Fokus liegt zunächst auf HTML zur Strukturierung von Webseiten (Tags, semantisches HTML, Formulare, Medien).
Anschließend folgt CSS zur visuellen Gestaltung mit Techniken wie Flexbox, Grid und Responsive Design.
Danach wird JavaScript eingeführt, um Interaktivität im Browser zu ermöglichen – inklusive DOM-Manipulation, Event-Handling und Speicherung von Zuständen.
Zusätzlich werden Methoden zur Kommunikation zwischen Web-Applikationen behandelt (z. B. JSON, AJAX/fetch).
Abschließend erfolgt ein praktischer Einstieg in Node.js zur serverseitigen Datenverarbeitung, ergänzt durch Grundlagen der Datenspeicherung (lokale Dateien und relationale Datenbanken) und einem Exkurs zur Trennung von Logik und Datenhaltung.

## 4. Einordnung üblicher Toolchains und Frameworks in der Web-Entwicklung

Dieser Abschnitt vermittelt ein grundlegendes Verständnis moderner Toolchains und Frameworks in der Webentwicklung.
Dabei wird zunächst geklärt, was eine Toolchain ist und warum sie trotz ihres schnellen Wandels relevant für die Ausbildung ist.
Anschließend werden zentrale Konzepte wie Transpiler (z. B. TypeScript) und deren Vorteile erläutert.
Die Unterschiede zwischen Libraries und Frameworks werden am "Hollywood-Prinzip" verdeutlicht.
Im Backend-Bereich wird die Entwicklung von RESTful APIs mit Express.js demonstriert, inklusive Routing und Middleware.
Für die Datenbankanbindung wird das Prinzip des Object-Relational Mapping (ORM) am Beispiel Prisma.js erklärt.
Im Frontend liegt der Fokus auf Komponenten-basierten Frameworks wie React, ergänzt um moderne Build-Tools wie Vite.
Abschließend wird der Nutzen und die Grenzen von Fullstack-Frameworks (z. B. TanStack Start) diskutiert 
– insbesondere im Hinblick auf integrierte Entwicklungs- und Deploymentprozesse.

## 5. Web Application Security

In diesem Abschnitt geht es um die grundlegende Bedeutung von Sicherheit in Webanwendungen.
Dabei wird vermittelt, dass Sicherheit kein absoluter Zustand ist, sondern vom jeweiligen Bedrohungsmodell abhängt – exemplarisch dargestellt mit dem STRIDE-Modell.
Es werden Maßnahmen zur Absicherung der Datenübertragung behandelt, darunter HTTPS, TLS, Zertifikate, HSTS und die Rolle von Let’s Encrypt.
Ein weiterer Schwerpunkt liegt auf Authentifizierung und Autorisierung, inklusive gängiger Verfahren wie OAuth2, MFA und der Vergleich von rollen- versus attributbasierter Zugriffskontrolle.
Anschließend werden typische Angriffsvektoren (z. B. SQL Injection, XSS, Session Hijacking) vorgestellt und mit geeigneten Schutzmaßnahmen verknüpft.
Abschließend wird die Bedeutung der OWASP Top 10 als praxisrelevante Übersicht über die häufigsten Sicherheitsrisiken erläutert.

## 6. Deployment und Operating von Web Applikationen

Dieser Abschnitt behandelt, wie Webanwendungen vom Entwicklungsprozess in den produktiven Betrieb überführt werden.
Dabei werden zentrale Konzepte des Software Development Lifecycle, Build-Prozesse und verschiedene Deployment-Optionen vorgestellt 
– vom klassischen Hosting auf einem VPS über containerbasiertes Hosting (inkl. Orchestrierung) bis hin zu Platform-as-a-Service-Ansätzen.
Es wird erläutert, wie mit verschiedenen Systemumgebungen (z. B. Entwicklung, Test, Produktion) umgegangen wird und welche Rolle Continuous Integration und Deployment (CI/CD) dabei spielen.
Abschließend werden Methoden zur Überwachung von Web-Applikationen behandelt, etwa durch Logs, Tracing, Metriken und automatisiertes Alerting.