import pandas as pd
import shutil
import os

# Ruta al archivo CSV - asegúrate de que esté correctamente entre comillas
csv_file = r'C:\Users\aviei\Documents\Parkings Dubai\Imagenes\Abu_Dhabi.csv'

# Verifica si el archivo CSV existe
if not os.path.isfile(csv_file):
    print(f"El archivo CSV no se encontró en la ruta: {csv_file}")
else:
    print(f"El archivo CSV fue encontrado en la ruta: {csv_file}")

    # Ruta de destino para guardar las imágenes
    destination_folder = r'C:\Users\aviei\Documents\Parkings Dubai\Imagenes\AbuDhabi'

    # Asegúrate de que la carpeta de destino existe
    os.makedirs(destination_folder, exist_ok=True)

    try:
        # Intenta leer el archivo CSV
        df = pd.read_csv(csv_file)
        print(f"Archivo CSV leído exitosamente, contiene {len(df)} filas.")
    except Exception as e:
        print(f"Error al leer el archivo CSV: {e}")
    
    # Si se pudo leer el archivo, continúa con la operación
    for index, row in df.iterrows():
        title = row['Name']  # Nombre del título
        image_name = row['Image Name']  # Nombre de la imagen
        images_path = row['Images Folder']  # Ruta de la carpeta de imágenes

        # Verifica que 'images_path' sea una cadena de texto válida
        if isinstance(images_path, str) and images_path.strip():
            # Ruta completa al archivo de imagen que se quiere copiar
            source_image_path = os.path.join(images_path, '1.png')

            # Verifica si el archivo de imagen existe en la ruta de origen
            if os.path.isfile(source_image_path):
                # Ruta completa al archivo de destino
                destination_image_path = os.path.join(destination_folder, f'{image_name}.png')

                # Copia el archivo de imagen a la carpeta de destino con el nuevo nombre
                try:
                    shutil.copy2(source_image_path, destination_image_path)
                    print(f'Imagen {source_image_path} copiada como {destination_image_path}')
                except Exception as e:
                    print(f'Error al copiar la imagen {source_image_path}: {e}')
            else:
                print(f'Archivo {source_image_path} no encontrado.')
        else:
            print(f'Ruta de imagen no válida para la fila {index + 1}. Verifica el valor en "Images Folder".')

print('Proceso completado.')
