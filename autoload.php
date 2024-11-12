<?php
function exoole_autoloader($className) {
    // Define namespaces and their corresponding directories
    $namespaceMap = [
        'includes' => __DIR__ . '/includes/',
    ];

    foreach ($namespaceMap as $namespace => $baseDir) {
        // Check if the class belongs to the current namespace
        if (strpos($className, $namespace) === 0) {
            // Remove the namespace from the class name
            $relativeClass = str_replace($namespace . '\\', '', $className);
            
            // Replace backslashes with directory separators
            $relativeClass = str_replace('\\', '/', $relativeClass);
            
            // Full file path
            $file = $baseDir . $relativeClass . '.php';
            
            if (file_exists($file)) {
                require_once $file;
                return;
            }
        }
    }
    
    // Optionally, throw an exception or error if class not found
	error_log(print_r("Class '$className' not found!", true));
}

spl_autoload_register('exoole_autoloader');
