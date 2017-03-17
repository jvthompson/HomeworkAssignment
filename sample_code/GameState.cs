using UnityEngine;
using System.Collections;

public abstract class GameState : MonoBehaviour
{
	public string Name;

    public void Start()
	{
		Name = gameObject.name;
	}

    public abstract void OnActivate();
    public abstract void OnDeactivate();
    public abstract void OnUpdate();
}