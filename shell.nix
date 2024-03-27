 let
 pkgs = import (builtins.fetchTarball {
        url = "https://github.com/NixOS/nixpkgs/archive/55070e598e0e03d1d116c49b9eff322ef07c6ac6.tar.gz";
    }) {};
 in

 pkgs.mkShell {
   packages = with pkgs; [
    pkgs.nodejs-16_x
   ];
 }