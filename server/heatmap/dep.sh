#!/bin/sh
# Uses easy_install to install required modules for the heatmap/analytics code to work 

# OS-level deps may also be needed:
# sudo apt-get install libfreetype2-dev libxft-dev
# sudo apt-get install libpng-dev
# sudo apt-get install libblas-common libopenblas-base libopenblas-dev
# sudo apt-get install gfortran

sudo easy_install matplotlib
sudo easy_install numpy
sudo easy_install scipy
sudo easy_install scitools

