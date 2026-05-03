git clone / git init
git rm
git mv
git remote add origin abc@...
git add .
git commit -m ""
git push / pull

git branch -c nomBranche (feature/fix/refactor/test)
git push -u origin nom-de-la-branche

git branch -d / -D nomBranche
git push origin --delete nom-de-la-branche

git switch nomBranche
git merge nomBranche
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
javadoc
/**
 *blablablabla
 *
 *@param x
 *@param y
 *
 *@returns
 *@throws
 *
 */
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
enum -> couleur.ROUGE
pub enumm Couleur {
    ROUGE,
    VERT,
    BLEU
}
~~~~~~~~~~~~~
pub classe Voiture {
    attribut A

    Constructeur(params A) {
        link param -> attribut;
    }

    set/get attribut A
 }

 pub classe Mazda enfent de Voiture {
    attribut B

    Constructeur (param A, param B) {
        sup(param A)
        link param B -> attribut B
    }

    set/get attribut B

    @
    toString() {
        blablabla;
    }
 }
 Mazda maVoiture = nouveau Mazda(MaZdA, rx-8)
