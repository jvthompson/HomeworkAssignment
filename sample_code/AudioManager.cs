using UnityEngine;
using System.Collections;
using System.Collections.Generic;


/// <summary>
/// AudioManager Class
/// 
/// This class maintains a Dictionary containing any global audio cues, music, etc 
/// to allow easy access to playing audio, and to avoid reloading the same clips
/// from scene to scene.
/// </summary>
public class AudioManager : Singleton<AudioManager> {

    public Dictionary<string, AudioSource> AudioObjects = new Dictionary<string, AudioSource>();
    public GameObject AudioContainer;
	// Use this for initialization
	void Start () {
        // We want our AudioManager to persist across all scenes to avoid the
        // overhead of reloading sound files every time we change the scene.
        GameObject.DontDestroyOnLoad(this.gameObject);

        foreach(Transform child in AudioContainer.transform)
        {
            GameObject go = child.gameObject;
            try
            {
                AudioSource a = go.GetComponent<AudioSource>();
                if (a == null)
                    return;
                string id = go.name;
                AudioObjects.Add(id, a);
            }
            catch(System.NullReferenceException ex)
            {
				Debug.Log (ex);
            }
        }
	}
	
    /// <summary>
    /// Plays the audio file corresponding to string id.
    /// </summary>
    /// <param name="id"></param>
    public void Play(string id)
    {
        if (AudioObjects.ContainsKey(id))
            AudioObjects[id].Play();
        else
            Debug.Log("Tried to play audio with id " + id + " but id does not exist.");
    }

    public void Pause(string id)
    {
        if (AudioObjects.ContainsKey(id))
            AudioObjects[id].Pause();
        else
            Debug.Log("Tried to pause audio with id " + id + " but id does not exist.");
    }

    public void PlayInstance(string id)
    {
        if (AudioObjects.ContainsKey(id))
        {
            StartCoroutine(CreateInstance(id));
        }
        else
            Debug.Log("Tried to play instance audio with id" + id + " but id does not exist.");
    }

    IEnumerator CreateInstance(string id)
    {
        GameObject go = new GameObject("Audio:" + id);
        AudioSource audioSource = go.AddComponent<AudioSource>();
        audioSource.clip = AudioObjects[id].clip;
        audioSource.Play();
        yield return new WaitForSeconds(audioSource.clip.length);
        Destroy(go);
    }

    /// <summary>
    /// Stops the audio file corresponding to string id.
    /// </summary>
    /// <param name="id"></param>
    public void Stop(string id)
    {
        if (AudioObjects.ContainsKey(id))
            AudioObjects[id].Stop();
        else
            Debug.Log("Tried to stop audio with id " + id + " but id does not exist.");
    }

    public AudioClip GetClip(string id)
    {
        return AudioObjects[id].clip;
    }

    public float GetClipLength(string id)
    {
        return AudioObjects[id].clip.length;
    }
}
