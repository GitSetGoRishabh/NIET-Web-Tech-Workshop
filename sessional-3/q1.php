<?php
session_start();
header('Content-Type: application/json');

$email = isset($_POST['email']) ? $_POST['email'] : '';
$password = isset($_POST['password']) ? $_POST['password'] : '';
$mobile = isset($_POST['mobile']) ? $_POST['mobile'] : '';

$_SESSION['email'] = $email;
$_SESSION['password'] = $password;
$_SESSION['mobile'] = $mobile;

$data = "Email: $email\n";
$data .= "Password: $password\n";
$data .= "Mobile: $mobile\n";
$data .= "Timestamp: " . date('Y-m-d H:i:s') . "\n";
$data .= "----------------------------\n";

$filename = 'user_data.txt';

try {
    $file = fopen($filename, 'a');
    if ($file) {
        fwrite($file, $data);
        fclose($file);
        echo json_encode([
            'success' => true,
            'message' => 'Data saved successfully!'
        ]);
    } else {
        throw new Exception('Could not open file');
    }
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error: ' . $e->getMessage()
    ]);
}
?>