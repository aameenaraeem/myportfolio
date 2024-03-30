<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $admin_email = "amennaibrahim@gmail.com"; // Replace with your admin email address
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    
    $subject = "New Message from $name";
    $body = "Name: $name\nEmail: $email\nMessage: $message";
    $headers = "From: $email";
    
    if (mail($admin_email, $subject, $body, $headers)) {
        echo "<script>alert('Your message has been sent!');</script>";
        echo "<script>window.location = 'contact.html';</script>";
    } else {
        echo "<script>alert('Failed to send your message. Please try again later.');</script>";
        echo "<script>window.location = 'contact.html';</script>";
    }
}
?>
