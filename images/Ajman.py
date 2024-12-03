import pandas as pd
import shutil
import os

# Ruta al archivo CSV
csv_file = r'C:\Users\aviei\Documents\Parkings Dubai\Imagenes\Ajman.csv'  # Cambia esto a la ubicación de tu archivo CSV

# Ruta de destino para guardar las imágenes
destination_folder = r'C:\Users\aviei\Documents\Parkings Dubai\Imagenes\Ajman'

# Lee el archivo CSV
df = pd.read_csv(csv_file)

# Recorre cada fila del DataFrame
for index, row in df.iterrows():
    title = row['Name']  # Nombre del título
    image_name = row['Image Name']  # Nombre de la imagen
    images_path = row['Images Folder']  # Ruta de la carpeta de imágenes

    # Verifica que 'images_path' sea una cadena de texto
    if isinstance(images_path, str) and images_path.strip():
        # Ruta completa al archivo de imagen que se quiere copiar
        source_image_path = os.path.join(images_path, '1.png')

        # Ruta completa al archivo de destino
        destination_image_path = os.path.join(destination_folder, f'{image_name}.png')

        # Verifica si el archivo de imagen existe en la ruta de origen
        if os.path.isfile(source_image_path):
            # Copia el archivo de imagen a la carpeta de destino con el nuevo nombre
            shutil.copy2(source_image_path, destination_image_path)
            print(f'Imagen {source_image_path} copiada como {destination_image_path}')
        else:
            print(f'Archivo {source_image_path} no encontrado.')
    else:
        print(f'Ruta de imagen no válida para la fila {index}. Verifica el valor en "Images Folder".')

print('Proceso completado.')
