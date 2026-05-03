//      A  B
matrice[0][0] = 1; / matrice.length - matrice[0].length
//cycle avec double boucle ( 1ere dimension / 2nd dimension )
//schéma visuel ->     B
                     _|_|_
                   A _|_|_
                      | |
~~~~~~~~~~~~~~~~~~~~
// variable static = partagé entre tout les instence | methode static = accessible partout via la classe
~~~~~~~~~~~~~~~~~~~~
// interface = contrat 
~~~~~~~~~~~~~~~~~~~~
 O(1) / O(n) / O(log n) / O(n * n)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Générique -> convention de nommage (Type/Element/Key/Value/Nuber/Return type) <>...
// lettre = type fictif -> tout peux entrer -> meme lettre repris pour les methode car meme type fictif
// meme si tout est permit -> doit toujours etre le meme une fois entrer -> si un int entre, les autre doivent aussi etre int
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//arraylist<> -> .ajouter("") / .set(0, "") / .get(0) / .remove(0) / .size() / tab[0] = ""
~~~~~~~~~~~~~~
//HashSet<> 
// @ hashcode 
// @ equals
~~~~~~~~~~~~~~
// Hashmap<key type, value type> 
// .put(A, B) / .get(KEY) / .remove(KEY) / .size() / .keySet()
~~~~~~~~~~~~~~
//ArrayDeque
// Pile 
// File 
//Méthodes : ajouterPremier(), ajouterDernier(), enleverPremier(), enleverDernier(), montrerPremier(), MontrerDernier(), offrirPremier(), offrirDernier(), grandeur(), estVide(), Effacer();
// + rapide que Stack, évite la surchage du LinkedList;
~~~~~~~~~~~~~~
// Programmation fonctionnelle
// Lambda :
// Permet de formuler des one-liners pour des méthodes ou Classes;
// (lambda.instructions) -> {}
// Utilsation du forEach pour les lambdas;
// Interfaces fonctionnelles
// Supplier 
// Consumer
// Comparator 
// Predicate 
// Function 
~~~~~~~~~~~~~~~
// comparable et comparator
pub interface comparable<T> {
    int compareTo(T);
}

Collections.sort() ;

// comparateur (ordre externe)
pub finale comparateur<listeAComparer> filtre_Par_x = 
    (exemple1, exemple2) -> exemple1.prendreX().comparerA(exemple2.prendreX());
    ou
    (exemple1, exemple2) -> comparer(exemple2.prendreX(), exemple1.prendreX());

listeAComparer.trie((exemp1, exemp2 ) -> {
    critère 1
    critère 2
    retourn fin 
 });