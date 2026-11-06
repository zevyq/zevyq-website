# Website von unterwegs bearbeiten

Produktionsquelle: dpl_CYFiM7VUKBN3bwMMs5Hwugm9kSTq (06.11.2026).
Die Quelldateien wurden gegen die Vercel-Dateipruefsummen abgeglichen.
Die generierte next-env.d.ts wird von Next.js neu erzeugt und nicht uebernommen.

Repository: https://github.com/zevyq/zevyq-website
Vercel-Projekt: zevyq-website
Domains: zevyq.de und www.zevyq.de
Node-Version der Produktion: 24.x

Ablauf: Fehler und betroffene Seite nennen; aktuellen GitHub- und Produktionsstand vergleichen;
Aenderung auf eigenem Branch vorbereiten; Website-Checks bestehen lassen;
Commit/Push und produktive Veroeffentlichung nur nach ausdruecklicher Freigabe.
Die Cloud-Checks bauen mit npm ci und npm run build; sie fuehren kein Vercel-Deployment aus.
Ein Build beweist keinen erfolgreichen Registrierungs-/Zahlungsablauf im Browser.

.env-Dateien, .vercel-Metadaten und Tokens sind nicht Teil dieses Abgleichs.
Vercel-Umgebungsvariablen bleiben im Vercel-Projekt; lokale Geheimnisse nicht einchecken.
Vor einem Merge nach main die Git-Deployment-Verknuepfung auf Vercel pruefen:
Eine bestehende Git-Integration koennte durch Push/Merge eine Veroeffentlichung ausloesen.

Die lokale Vorbereitung ersetzt nur abgeglichene Dateien und fuehrt keinen Commit,
Push oder Deployment aus. Ein GitHub-Branch allein beweist noch nicht,
dass die aktuell veroeffentlichte Website diesen Commit verwendet.
