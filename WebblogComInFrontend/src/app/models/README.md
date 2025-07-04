


Models beschreiben, wie Daten aufgebaut sind – z. B. ein Post, ein User oder ein Tag.
So weiß man genau, welche Infos ein Objekt hat, wie z. B. title, content, id usw.
Damit kann man sauber und typensicher arbeiten, besonders wenn man Schnittstellen im Backend ansteuert.


Beispiel: Post-Modell für Beiträge

export interface Post 
{
  id: number;          // Eindeutige ID des Posts
  title: string;       // Titel des Beitrags
  content: string;     // Inhalt/Text des Beitrags
  categoryId: number;  // Verknüpfte Kategorie (Fremdschlüssel)
  tagIds: number[];    // Liste der zugewiesenen Tags (mehrere möglich, deshalb ein Array von ID's)
  userId: number;      // Autor/User des Posts
}