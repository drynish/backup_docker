<?php
// Valider que c'est une requête POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Method Not Allowed');
}

// Configuration CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Charger les dépendances Mailgun
require 'vendor/autoload.php';
use Mailgun\Mailgun;

// Clés de sécurité (injectées via variables d'environnement Docker)
$recaptcha_secret = getenv('RECAPTCHA_SECRET');
$mailgun_api_key  = getenv('MAILGUN_API_KEY');
$mailgun_domain   = getenv('MAILGUN_DOMAIN') ?: 'conservervotrepermis.ca';

// Valider le reCAPTCHA
if (!isset($_POST['captcha']) || empty($_POST['captcha'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'reCAPTCHA validation failed']);
    exit;
}

$captcha_response = $_POST['captcha'];
$verify_url = "https://www.google.com/recaptcha/api/siteverify";

$verify_data = [
    'secret' => $recaptcha_secret,
    'response' => $captcha_response
];

$options = [
    'http' => [
        'method' => 'POST',
        'content' => http_build_query($verify_data),
        'header' => "Content-Type: application/x-www-form-urlencoded\r\n"
    ]
];

$context = stream_context_create($options);
$verify_response = file_get_contents($verify_url, false, $context);
$captcha_success = json_decode($verify_response);

if (!$captcha_success->success) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'reCAPTCHA verification failed']);
    exit;
}

// Valider et nettoyer les données du formulaire
$name = isset($_POST['nom']) ? trim($_POST['nom']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// Valider les champs
$errors = [];

if (empty($name) || strlen($name) < 2) {
    $errors[] = 'Nom invalide';
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Email invalide';
}

if (empty($message) || strlen($message) < 10) {
    $errors[] = 'Message trop court (minimum 10 caractères)';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'errors' => $errors]);
    exit;
}

try {
    // Initialiser Mailgun
    $mg = Mailgun::create($mailgun_api_key);
    
    // Préparer le message
    $params = [
        'from' => "Site Conserver Votre Permis <noreply@{$mailgun_domain}>",
        'to' => 'isabelle@conservervotrepermis.ca',
        'h:Reply-To' => $email,
        'subject' => 'Nouvelle demande du formulaire de contact',
        'text' => "Nom: $name\nEmail: $email\n\nMessage:\n$message"
    ];
    
    // Envoyer l'email via Mailgun
    $mg->messages()->send($mailgun_domain, $params);
    
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Email envoyé avec succès!']);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erreur lors de l\'envoi de l\'email']);
    error_log('Mailgun Error: ' . $e->getMessage());
}
?>

