using UnityEngine;
using System.Collections;

public class StateManager : Singleton<StateManager>
{
	public int timeToAttract;
	public float currentTimer = 0;
    private GameState currentState;
    public GameState State
    {
        get { return currentState; }
    }

    //Changes the current game state
    public void SetState(System.Type newStateType)
    {
        if (currentState != null)
        {
            currentState.OnDeactivate();
        }

        currentState = GetComponentInChildren(newStateType) as GameState;
        if (currentState != null)
        {
            currentState.OnActivate();
        }
    }

    void Update()
    {
		if (currentState.Name != "AttractState") {
			if (Input.GetMouseButton(0) || Input.anyKey || Input.touchCount > 0)
			{
				currentTimer = 0;
			}
			currentTimer += Time.deltaTime;
			if (currentTimer >= timeToAttract)
			{
				currentTimer = 0;
				SetState(typeof(AttractState));
			}
		}

        if (currentState != null)
        {
            currentState.OnUpdate();
        }
    }

    void Start()
    {
		// On Start(), call SetState along with the typeof for the game state you wish
		// to begin in.

        SetState(typeof(SplashScreenState));
    }
}
