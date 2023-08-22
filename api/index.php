<?php
$id = $_GET['id'];
$dir = '../';
// Определяем имя файла, соответствующего идентификатору
//$filename = '../' . $id . '.html';
$filename = '../users/'.$id.'/index.html';
// Проверяем, существует ли файл
if (file_exists($filename)) {
    // Открываем файл и читаем его содержимое
    $content = file_get_contents($filename);
    // Устанавливаем заголовок CORS
    header('Access-Control-Allow-Origin: *');
    // Возвращаем содержимое файла в виде JSON
    echo json_encode(array(
        'id' => $id,
        'content' => $content
    ));
} else {
    header('Access-Control-Allow-Origin: *');
    // Если файл не существует, возвращаем ошибку 404
    http_response_code(404);
    echo json_encode(array(
        'error' => 'File not found'
    ));
}