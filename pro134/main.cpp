#include <iostream>
#include <SDL.h>
#include <SDL_image.h>
#include <string>
using namespace std;

bool init();
bool loadMedia();
void close();

SDL_Texture* loadTexture(string path);
SDL_Window* window = NULL;
SDL_Surface* mainSurface = NULL;
SDL_Surface* currentSurface = NULL;
SDL_Rect stretchRect;
SDL_Renderer* gRenderer = NULL;
SDL_Texture* gTexture = NULL;

SDL_Event e;
bool running = true;
enum KeyPresses {
	KEY_PRESS_DEFAULT,
	KEY_PRESS_UP,
	KEY_PRESS_DOWN,
	KEY_PRESS_LEFT,
	KEY_PRESS_RIGHT,
	KEY_PRESS_TOTAL
};

int SCREEN_WIDTH = 600;
int SCREEN_HEIGHT = 400;

SDL_Texture* loadTexture(string path)
{
	SDL_Texture* endTexture = NULL;
	SDL_Surface* tempSurface = IMG_Load("resources/up.bmp");
	if (tempSurface == NULL)
	{
		return NULL;
	}
	endTexture = SDL_CreateTextureFromSurface(gRenderer, tempSurface);
	if (endTexture == NULL)
	{
		return NULL;
	}
	SDL_FreeSurface(tempSurface);
	return endTexture;
}

bool init()
{
	if (SDL_Init(SDL_INIT_VIDEO) < 0)
	{
		return false;
	}
	
	// creating the window
	window = SDL_CreateWindow("title", SDL_WINDOWPOS_CENTERED, SDL_WINDOWPOS_CENTERED, SCREEN_WIDTH, SCREEN_HEIGHT, SDL_WINDOW_SHOWN);
	if (window == NULL)
	{
		cout << "failed to create window" << endl;
		return false;
	}
	
	// creating the renderer
	gRenderer = SDL_CreateRenderer(window, -1, SDL_RENDERER_ACCELERATED);
	if (gRenderer == NULL)
	{
		cout << "failed to created the renderer" << endl;
		return false;
	}
	SDL_SetRenderDrawColor(gRenderer, 0xFF, 0xFF, 0xFF, 0xFF);

	// initialize SDL_Image
	int imgFlags = IMG_INIT_PNG;
	if (!(IMG_Init(imgFlags) & imgFlags))
	{
		cout << "failed to initialize SDL_Image" << endl;
		return false;
	}
	return true;
}

bool loadMedia()
{
	gTexture = loadTexture("resources/up.bmp");
	if (gTexture == NULL)
	{
		cout << "failed to load texture" << endl;
		return false;
	}
	return true;
}

void close()
{
	// destroying the texture
	SDL_DestroyTexture(gTexture);
	gTexture = NULL;

	// destroying the window
	SDL_DestroyWindow(window);
	window = NULL;

	// destroying the renderer
	SDL_DestroyRenderer(gRenderer);
	gRenderer = NULL;

	// quitting systems
	IMG_Quit();
	SDL_Quit();
}

int main(int argc, char* argv[])
{
	if (!init())
	{
		cout << "couldn't initialise" << endl;
		return 1;
	}

	if (!loadMedia())
	{
		cout << "loadMedia() failed" << endl;
		return 1;
	}

	while (running)
	{
		while (SDL_PollEvent(&e) != 0)
		{
			if (e.type == SDL_QUIT)
			{
				running = false;
			}
		}

		SDL_RenderClear(gRenderer);
		SDL_RenderCopy(gRenderer, gTexture, NULL, NULL);
		SDL_RenderPresent(gRenderer);
	}
	
	close();
	return 0;
}