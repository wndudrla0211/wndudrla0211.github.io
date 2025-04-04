#include <iostream>
#include <SFML/Graphics.hpp>
#include <SFPhysics.h>
using namespace std;
using namespace sf;
using namespace sfp;
int main()
{
    RenderWindow window(VideoMode(800, 600), "Bounce");
    World world(Vector2f(0, 1));

    PhysicsCircle ball;
    ball.setCenter(Vector2f(400, 300));
    ball.setRadius(20);
    world.AddPhysicsBody(ball);

    PhysicsRectangle floor;
    floor.setSize(Vector2f(800, 20));
    floor.setCenter(Vector2f(400, 590));
    floor.setStatic(true);
    world.AddPhysicsBody(floor);

    PhysicsRectangle leftWall;
    leftWall.setSize(Vector2f(20, 600));
    leftWall.setCenter(Vector2f(10, 300));
    leftWall.setStatic(true);
    world.AddPhysicsBody(leftWall);

    PhysicsRectangle rightWall;
    rightWall.setSize(Vector2f(20, 600));
    rightWall.setCenter(Vector2f(790, 300));
    rightWall.setStatic(true);
    world.AddPhysicsBody(rightWall);

    PhysicsRectangle ceiling;
    ceiling.setSize(Vector2f(800, 20));
    ceiling.setCenter(Vector2f(400, 10));
    ceiling.setStatic(true);
    world.AddPhysicsBody(ceiling);

    PhysicsRectangle target;
    target.setSize(Vector2f(100, 100));
    target.setCenter(Vector2f(400, 300));
    target.setStatic(true);
    world.AddPhysicsBody(target);

    ball.setCenter(Vector2f(200, 300));
    ball.applyImpulse(Vector2f(1.0, 0.0));

    int thudCount(0);
    floor.onCollision = [&thudCount](PhysicsBodyCollisionResult result) {
        cout << "thud " << thudCount << endl;
        thudCount++;
        };

    int bangCount(0);
    target.onCollision = [&bangCount, &window](PhysicsBodyCollisionResult result) {
        cout << "bang " << bangCount << endl;
        bangCount++;
        if (bangCount >= 3) {
            window.close();
            exit(0);
        }
        };

    Clock clock;
    Time lastTime(clock.getElapsedTime());
    while (true) {
        Time currentTime(clock.getElapsedTime());
        Time deltaTime(currentTime - lastTime);
        int deltaTimeMS(deltaTime.asMilliseconds());
        if (deltaTimeMS > 0) {
            world.UpdatePhysics(deltaTimeMS);
            lastTime = currentTime;
        }

        window.draw(ball);
        window.draw(floor);
        window.draw(leftWall);
        window.draw(rightWall);
        window.draw(ceiling);
        window.draw(target);
        window.display();
    }
}