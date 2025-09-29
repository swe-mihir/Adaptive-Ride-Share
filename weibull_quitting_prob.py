import numpy as np

def quitting_probability(t, lam, k):
    """
    Calculate the probability that a passenger has quit within time t using the Weibull distribution CDF.
    
    The Weibull CDF is: F(t) = 1 - exp(-(t/λ)^k)
    
    Parameters:
    -----------
    t : float or numpy.ndarray
        Elapsed waiting time(s). Must be >= 0.
    lam : float
        Scale parameter (λ). Must be > 0.
    k : float
        Shape parameter (k). Must be > 0.
    
    Returns:
    --------
    float or numpy.ndarray
        Probability(ies) that passenger has quit within time t.
        Returns 0 for t <= 0, values between 0 and 1 for t > 0.
    
    Raises:
    -------
    ValueError
        If lam <= 0 or k <= 0.
    
    Examples:
    ---------
    >>> quitting_probability(5.0, lam=10.0, k=1.5)
    0.3290344932545586
    
    >>> quitting_probability(np.array([1, 5, 10]), lam=10.0, k=1.5)
    array([0.09516258, 0.32903449, 0.63212056])
    """
    
    # Validate parameters
    if lam <= 0:
        raise ValueError("Scale parameter 'lam' must be greater than 0")
    if k <= 0:
        raise ValueError("Shape parameter 'k' must be greater than 0")
    
    # Convert t to numpy array for consistent handling
    t_array = np.asarray(t)
    
    # Handle edge case: t <= 0 should return 0
    # Create result array with same shape as input
    result = np.zeros_like(t_array, dtype=float)
    
    # Only calculate for positive times
    positive_mask = t_array > 0
    
    if np.any(positive_mask):
        # Calculate Weibull CDF: F(t) = 1 - exp(-(t/λ)^k)
        t_positive = t_array[positive_mask]
        result[positive_mask] = 1 - np.exp(-((t_positive / lam) ** k))
    
    # Return scalar if input was scalar, otherwise return array
    if np.isscalar(t):
        return float(result)
    else:
        return result


# Example usage and testing
if __name__ == "__main__":
    # Test with scalar input
    print("Scalar input test:")
    prob1 = quitting_probability(5.0, lam=10.0, k=1.5)
    print(f"quitting_probability(5.0, lam=10.0, k=1.5) = {prob1:.6f}")
    
    # Test with array input
    print("\nArray input test:")
    times = np.array([1, 5, 10, 15, 20])
    probs = quitting_probability(times, lam=10.0, k=1.5)
    print(f"Times: {times}")
    print(f"Probabilities: {probs}")
    
    # Test edge cases
    print("\nEdge case tests:")
    
    # Test t <= 0
    prob_zero = quitting_probability(0.0, lam=10.0, k=1.5)
    prob_negative = quitting_probability(-1.0, lam=10.0, k=1.5)
    print(f"quitting_probability(0.0, lam=10.0, k=1.5) = {prob_zero}")
    print(f"quitting_probability(-1.0, lam=10.0, k=1.5) = {prob_negative}")
    
    # Test array with mixed positive/negative values
    mixed_times = np.array([-1, 0, 1, 5, 10])
    mixed_probs = quitting_probability(mixed_times, lam=10.0, k=1.5)
    print(f"Mixed times: {mixed_times}")
    print(f"Mixed probabilities: {mixed_probs}")
    
    # Test parameter validation
    print("\nParameter validation tests:")
    try:
        quitting_probability(5.0, lam=0.0, k=1.5)
    except ValueError as e:
        print(f"Expected error for lam=0: {e}")
    
    try:
        quitting_probability(5.0, lam=10.0, k=0.0)
    except ValueError as e:
        print(f"Expected error for k=0: {e}")
    
    # Test different parameter combinations
    print("\nDifferent parameter combinations:")
    t_test = 5.0
    
    # Different shape parameters (k)
    for k_val in [0.5, 1.0, 1.5, 2.0, 3.0]:
        prob = quitting_probability(t_test, lam=10.0, k=k_val)
        print(f"k={k_val}, prob={prob:.6f}")
    
    print("\n" + "="*50)
    
    # Different scale parameters (lambda)
    for lam_val in [5.0, 10.0, 15.0, 20.0]:
        prob = quitting_probability(t_test, lam=lam_val, k=1.5)
        print(f"λ={lam_val}, prob={prob:.6f}")