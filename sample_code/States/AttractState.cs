using UnityEngine;
using System.Collections;

public class AttractState : GameState
{

    public GameObject attractScreenObject;
    private ScreenBase screen;
    private AttractScreen attract;
    public GameState stateToTransitionTo;

    private bool canTransition;

    new void Start()
    {
        base.Start();
        screen = attractScreenObject.GetComponent<ScreenBase>();
        attract = attractScreenObject.GetComponent<AttractScreen>();
        
    }

    private void EnableTransition()
    {
        canTransition = true;
    }

    public override void OnActivate()
    {
        ScreenManager.Instance.OpenPanelWhenClosed(screen);
        canTransition = false;
        Invoke("EnableTransition", 3.0f);

#if UNITY_STANDALONE_WIN
        attract.StartAttract ();
#endif
    }

    public override void OnDeactivate()
    {
#if UNITY_STANDALONE_WIN
		attract.StopAttract ();
#endif
    }

    public override void OnUpdate()
    {
        if ((Input.anyKey || Input.touchCount > 0) && canTransition)
        {
            // Change the below state as necessary for the current project.


            StateManager.Instance.SetState(stateToTransitionTo.GetType());
        }
    }
}
