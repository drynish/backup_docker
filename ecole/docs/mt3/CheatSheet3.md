~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Optional<T> -> null safety

// AVANT
Etudiant e = trouverParNom("Alice");
e.getNote(); // NullPointerException

// APRÈS
Optional<Etudiant> e = trouverParNom("Alice");

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// CRÉATION

Optional.of("Alice");
Optional.empty();
Optional.ofNullable(x); // x null ok

// 
Optional.of(x);         // x != null
Optional.ofNullable(x); // x peut être null

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// CHECK / GET

opt.isPresent();
opt.get(); //  NoSuchElementException

opt.ifPresent(System.out::println);

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// DEFAULT

opt.orElse("x");
opt.orElseGet(() -> "x");

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// EXCEPTION

opt.orElseThrow(() -> new IllegalStateException());

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// STREAM

List.of("A","B","C")
    .stream()
    .filter()
    .findFirst(); // Optional

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// MÉTHODES

Optional.of()
Optional.ofNullable()
Optional.empty()

isPresent()
get()

ifPresent()

orElse()
orElseGet()
orElseThrow()