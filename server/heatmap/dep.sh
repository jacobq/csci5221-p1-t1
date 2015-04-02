#!/bin/sh
# Uses easy_install to install required modules for the heatmap/analytics code to work 

# OS-level deps may also be needed:
# sudo apt-get install libfreetype2-dev libxft-dev
# sudo apt-get install libpng-dev
# sudo apt-get install libatlas-base-dev
# sudo apt-get install libblas-common libopenblas-base libopenblas-dev
# sudo apt-get install gfortran
# Note: A/V packages are often patent-encumbered, so they may require licensing
# sudo apt-get install ffmpeg mencoder w64codecs libavcodec-extra-54



sudo easy_install matplotlib
# NOTE: new versions of numpy drop oldnumeric.*, some of which are needed for scitools
sudo easy_install numpy
sudo easy_install scipy
sudo easy_install scitools

