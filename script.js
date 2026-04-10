const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const buc = new Buc(150, 350);

// Wait for Buc's image to load before drawing
buc.image.onload = () => {
    buc.draw(ctx);
};