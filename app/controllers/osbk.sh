sudo mkdir -p /mnt/vij/bk
sudo mount /dev/sda5 /mnt/vij/bk
sudo rsync -aAXP --delete --exclude={/dev/*,/proc/*,/sys/*,/tmp/*,/run/*,/mnt/*,/media/*,/cdrom/*,/lost+found} / /mnt/vij/bk/ubuntu_os_bk/mar_14_24
sudo umount /mnt/vij/bk