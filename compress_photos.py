# i have a folder full of photos that i want to compress
# i want to compress them from 1920x1080 to 1280x720 in one folder
# then i want to compress them from 1280x720 to 640x360 in another folder

import os
from PIL import Image

# get the current working directory
cwd = os.getcwd()

# path is /public/images
path = cwd + '/public/1920x1080'

# print all the files in the folder
print(os.listdir(path))

# each photo is "A_000.png", "A_001.png", ..., "A_637.png"
# each photo is 1920x1080
# i want to compress them to 1280x720
# and save them in a new folder called "1280x720"
# so the new photos will be "A_000.png", "A_001.png", ..., "A_637.png"

# create a new folder called "1280x720"
new_folder = "public/640x360"
os.mkdir(new_folder)

# loop through each photo
for i in range(0, 638):
    # get the photo name
    photo_name = 'A_' + str(i).zfill(3) + '.png'
    # open the photo
    photo = Image.open(path + '/' + photo_name)
    # resize the photo
    resized_photo = photo.resize((640, 360))
    # save the photo in the new folder
    resized_photo.save(new_folder + '/' + photo_name)

